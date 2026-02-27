/* eslint-disable unused-imports/no-unused-vars */
import { reactive, ref } from 'vue'
import { ab2hex } from '@/common/protocol-common'
import { BLE_CMD, BLE_CONSTS } from './protocol-ble'

export function useBle(args: { deviceId: string } | undefined) {
  const bleState = reactive({
    isOpened: false,
    isScanning: false,
    isConnected: false,
  })

  const devices = ref<Map<string, UniApp.BluetoothDeviceInfo>>(new Map())
  // #ifdef MP-WEIXIN
  function onStart() {
    uni.openBluetoothAdapter({
      services: [BLE_CONSTS.SERVICE_UUID],
      success(res) {
        console.warn('[BLE] 打开蓝牙适配器')
        bleState.isOpened = true
        // 扫描蓝牙
        uni.startBluetoothDevicesDiscovery({
          services: [BLE_CONSTS.SERVICE_UUID],
          success() {
            console.warn('[BLE] 扫描蓝牙')
            // uni.stopBluetoothDevicesDiscovery()
            bleState.isScanning = true
          },
          fail(err) {
            console.error('[BLE] 扫描蓝牙失败', err)
          },
        })
      },
      fail(err) {
        console.error('[BLE] 打开蓝牙适配器失败', err)
      },
    })
  }

  function unlock() {
    if (!bleState.isOpened || !bleState.isConnected || !args?.deviceId) {
      console.error('[BLE] 蓝牙未打开或设备ID为空')
      return
    }
    uni.writeBLECharacteristicValue({
      deviceId: args.deviceId,
      serviceId: BLE_CONSTS.SERVICE_UUID,
      characteristicId: BLE_CONSTS.CHAR_WRITE_UUID,
      value: new Uint8Array([BLE_CMD.UNLOCK]).buffer as any,
      success() {
        console.warn('[BLE] 发送指令成功')
      },
      fail(err) {
        console.error('[BLE] 发送指令失败', err)
      },
    })
  }

  uni.onBluetoothDeviceFound((res) => {
    res.devices.forEach((device) => {
      console.warn('[BLE] 发现蓝牙设备', device.deviceId, device.localName ?? device.name, ab2hex(device.advertisData))
      devices.value.set(device.deviceId, device)
      if (args?.deviceId && device.deviceId === args.deviceId) {
        uni.createBLEConnection({
          deviceId: device.deviceId,
          success() {
            console.warn('[BLE] 连接蓝牙')
            bleState.isConnected = true
            uni.getBLEDeviceServices({
              deviceId: device.deviceId,
              success(res) {
                console.warn('[BLE] 获取蓝牙服务', res)
                const serviceId = res.services.find(s => s.uuid.toUpperCase() === BLE_CONSTS.SERVICE_UUID)?.uuid
                if (!serviceId) {
                  console.error('[BLE] 未找到蓝牙服务')
                  return
                }
                uni.getBLEDeviceCharacteristics({
                  deviceId: device.deviceId,
                  serviceId,
                  //   characteristicId: BLE_CONSTS.CHAR_NOTIFY_UUID,
                  success(res) {
                    console.warn('[BLE] 获取蓝牙特征值', res)

                    uni.notifyBLECharacteristicValueChange({
                      deviceId: device.deviceId,
                      serviceId: BLE_CONSTS.SERVICE_UUID,
                      characteristicId: BLE_CONSTS.CHAR_NOTIFY_UUID,
                      state: true,
                      success() {
                        console.warn('[BLE] 开启蓝牙通知')
                        // uni.writeBLECharacteristicValue({
                        //   deviceId: device.deviceId,
                        //   serviceId: BLE_CONSTS.SERVICE_UUID,
                        //   characteristicId: BLE_CONSTS.CHAR_WRITE_UUID,
                        //   value: [BLE_CMD.UNLOCK],
                        //   success() {
                        //     console.warn('[BLE] 写入 CCCD 成功')
                        //   },
                        //   fail(err) {
                        //     console.error('[BLE] 写入 CCCD 失败', err)
                        //   },
                        // })
                        setTimeout(() => {
                          unlock()
                        }, 2000)
                      },
                      fail(err) {
                        console.error('[BLE] 开启蓝牙通知失败', err)
                      },
                    })
                  },
                  fail(err) {
                    console.error('[BLE] 获取蓝牙特征值失败', err)
                  },
                })
              },
              fail(err) {
                console.error('[BLE] 获取蓝牙服务失败', err)
              },
            })
          },
          fail(err) {
            console.error('[BLE] 连接蓝牙失败', err)
          },
          complete() {
            // 链接设备成功后停止设备发现服务
            uni.stopBluetoothDevicesDiscovery({
              success() {
                console.warn('[BLE] 停止扫描蓝牙')
                bleState.isScanning = false
              },
              fail(err) {
                console.error('[BLE] 停止扫描蓝牙失败', err)
              },
            })
          },
        })
      }
    })
  })

  uni.onBLEConnectionStateChange((res) => {
    console.warn('[BLE] 蓝牙连接状态改变', res)
  })

  uni.onBLECharacteristicValueChange((res) => {
    console.warn('[BLE] 蓝牙特征值改变', res)
  })

  return {
    bleState,
    devices,
    onStart,
    unlock,
  }
  // #endif

  // #ifndef MP-WEIXIN
  return {
    bleState,
    devices,
    onStart: () => {
      console.error('[BLE] 当前平台不支持蓝牙')
    },
    unlock: () => {
      console.error('[BLE] 当前平台不支持蓝牙')
    },
  }
  // #endif
}
