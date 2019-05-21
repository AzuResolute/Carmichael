import React, {Component} from 'react'

class GameTile extends Component {
  constructor(value) {
    super(value)
    this.state = {
      value,
      cageId: null
    }
  }

  CageExtend = (cageId, init) => {

  }

  render() {
    const {value, cageId} = this.state
    return (
      <td>
        {value}
      </td>
    )
  }
}

export default GameTile
