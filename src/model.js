import StarRatings from './react-star-ratings';
import React from 'react';
import ReactDOM from 'react-dom';
class Foo extends React.Component {
  changeRating( newRating, name ) {
    this.setState({
      rating: newRating
    });
  }

  render() {
    // rating = 2;
    return (
      <StarRatings
        rating={this.state.rating}
        starRatedColor="blue"
        changeRating={this.changeRating}
        numberOfStars={6}
        name='rating'
      />
    );
  }
}

ReactDOM.render(<Foo />, document.getElementById('row'));
