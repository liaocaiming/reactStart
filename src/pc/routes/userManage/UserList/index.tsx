import * as React from 'react';
import { connect } from 'react-redux';
class Cart extends React.PureComponent<any, any> {
  constructor(props:any) {
    super(props);
  }
  public componentWillMount () {
    console.log(this.props)
  }
  render () {
    return <span>userList</span>
  }
}
export default connect((state) => state)(Cart)