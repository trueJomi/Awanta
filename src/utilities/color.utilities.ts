function hexToRgb (hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (result !== null) {
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    }
  } else {
    throw new Error('Error al convertir el color')
  }
}

function getBrillo (hex: string) {
  const rgb = hexToRgb(hex)
  const red = rgb.r
  const green = rgb.g
  const blue = rgb.b
  const brightness = Math.sqrt((0.241 * (red * red)) + (0.671 * (green * green)) + (0.068 * (blue * blue)))
  return brightness
}

export function adaptativeColorText (hex: string) {
  const lightColor = '#fff3e3'
  const darkColor = '#3f2c25'
  const brightness = getBrillo(hex)
  if (brightness > 128) {
    return darkColor
  } else {
    return lightColor
  }
}
function componentToHex (c: number) {
  const hex = c.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}

function rgbToHex (r: number, g: number, b: number) {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b)
}

export function adaptativeColor (hex: string) {
  const lightColor = '#FFFFFF'
  const darkColor = rgbToHex(17, 24, 39)
  const brightness = getBrillo(hex)
  if (brightness > 128) {
    return darkColor
  } else {
    return lightColor
  }
}

export function invert (hex: string) {
  const lightColor = '#fff3e3'
  const darkColor = '#3f2c25'
  if (lightColor === hex) {
    return darkColor
  } else {
    return lightColor
  }
}
