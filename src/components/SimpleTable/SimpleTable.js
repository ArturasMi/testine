import React from "react"
const SimpleTable = ({ data, ignoreKeys }) => {
  return (
    <div className="SimpleTableContainer">
      <div className="SimpleTable">
        {data.map((x, i) => (
          <TableRow data={x} key={i} index={i} ignoreKeys={ignoreKeys} />
        ))}
      </div>
    </div>
  )
}

const TableRow = ({ data, index, ignoreKeys }) => {
  let newList = []
  for (const [key, value] of Object.entries(data)) {
    newList.push({
      key,
      value,
    })
  }

  return [
    index === 0 && (
      <div className="TableRow Heads Flex" key="table-heads">
        {newList.map((x, i) => {
          let excludeColumn = false

          if (ignoreKeys?.length) {
            const find = ignoreKeys.find(y => y === x.key)
            if (find) {
              excludeColumn = true
            }
          }

          if (!excludeColumn)
            return (
              <div className="TableColumn" key={i}>
                {x.key}
              </div>
            )
          else return null
        })}
      </div>
    ),
    <div className="TableRow Flex" key={"table-row-" + index}>
      {newList.map((x, i) => {
        let excludeColumn = false

        if (ignoreKeys?.length) {
          const find = ignoreKeys.find(y => y === x.key)
          if (find) {
            excludeColumn = true
          }
        }

        if (!excludeColumn)
          return (
            <div className="TableColumn" key={i}>
              {x.value}
            </div>
          )
        else return null
      })}
    </div>,
  ]
}

export default SimpleTable
