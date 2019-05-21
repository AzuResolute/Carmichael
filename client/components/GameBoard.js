import React, {Component} from 'react'
import GameTile from './GameTile'

class GameBoard extends Component {
  constructor(encoding) {
    super(encoding)
    this.state = {
      boardValues: encoding,
      boardSize: Number(Math.sqrt(encoding.length))
    }
  }

  RenderTiles = (size, values) => {
    let tiles = []
    for(let r = 0; r < size; r++) {
      let rowTiles = []
      for(let c = 0; c < size; c++) {
        rowTiles.push(
          values[c+(r*size)])
      }
      tiles.push(rowTiles)
    }
    return tiles
  }

  render() {
    const {boardSize, boardValues} = this.state
    return (
      <div className="GameBoardContainer">
        <table>
          <th>
            <td colSpan={boardSize}>Calcudoku Game</td>
          </th>
          {this.RenderTable(boardSize, boardValues)}
        </table>

      </div>
    )
  }
}

export default GameBoard
