'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false,
                    count: 0 };
  }

render() {
    if (this.state.liked) {
      this.state.count = ++this.state.count; 
      return this.state.count;
    }

    return e(
      'button', { onClick: () => this.setState({ liked: true }) }, 'Like'
    );
  }
}

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(LikeButton), domContainer);