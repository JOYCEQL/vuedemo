/*
 * @Author: yuguangzhou
 * @Date: 2021-08-10 16:30:21
 * @LastEditTime: 2021-08-10 16:32:08
 * @LastEditors: yuguangzhou
 * @Description:
 */
export function Wall () {
  const WshShell = new ActiveXObject('WScript.Shell')
  WshShell.SendKeys('{F11}')
}
