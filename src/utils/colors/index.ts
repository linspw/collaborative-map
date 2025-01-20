const colorMap = {
  '#F44336': 'red',
  '#E91E63': 'pink',
  '#9C27B0': 'purple',
  '#3F51B5': 'indigo',
  '#2196F3': 'blue',
  '#03A9F4': 'light-blue',
  '#00BCD4': 'cyan',
  '#009688': 'teal',
  '#4CAF50': 'green',
  '#FFEB3B': 'yellow',
  '#FF9800': 'orange',
  '#795548': 'brown',
  '#607D8B': 'blue-grey',
  '#000000': 'black',
  // '#FFFFFF': 'white',
}

export const getSimpleRandomColor = (options: { exclude?: string[] } = {}) => {
  let list = Object.entries(colorMap)

  if (options.exclude) {
    list = list.filter(([key, value]) => {
      if (options.exclude!.includes(key)) return false

      if (options.exclude!.includes(value)) return false

      return true
    })
  }

  return list[Math.floor(Math.random() * list.length)].at(0)!
}
