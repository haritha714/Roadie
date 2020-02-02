import React from "react";
//import index, {reviewScores} from './index';

let reviews = [
  {
    reviewedBy: "Gopal",
    ratingScore: 3,
    revieweTitle: "Perfect",
    revieweDesc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
    reviewedDate: "01/01/20"
  },
  {
    reviewedBy: "Ravi",
    ratingScore: 5,
    revieweTitle: "Great",
    revieweDesc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
    reviewedDate: "01/02/20"
  },
  {
    reviewedBy: "Harry",
    ratingScore: 5,
    revieweTitle: "Good",
    revieweDesc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
    reviewedDate: "01/03/20"
  },
  {
    reviewedBy: "Josh",
    ratingScore: 2,
    revieweTitle: "Okay",
    revieweDesc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
    reviewedDate: "01/04/20"
  }
];

function setReview(review) {
  reviews.push(review);
}

function getScoreInPercentage() {
  var totalUsers = reviews.length;
  var oneStartIndex = 0,
    twoStartIndex = 0,
    threeStartIndex = 0,
    fourStartIndex = 0,
    fiveStartIndex = 0;

  for (var review in reviews) {
    console.log("ratingScore =" + review);
    var reviewJSON = reviews[review];

    if (reviewJSON.ratingScore === 1) {
      oneStartIndex++;
    } else if (reviewJSON.ratingScore === 2) {
      twoStartIndex++;
    } else if (reviewJSON.ratingScore === 3) {
      threeStartIndex++;
    } else if (reviewJSON.ratingScore === 4) {
      fourStartIndex++;
    } else if (reviewJSON.ratingScore === 5) {
      fiveStartIndex++;
    }
  }

  var reviewScores = {
    oneStar: (oneStartIndex / totalUsers) * 100 + "%",
    twoStar: (twoStartIndex / totalUsers) * 100 + "%",
    threeStar: (threeStartIndex / totalUsers) * 100 + "%",
    fourStar: (fourStartIndex / totalUsers) * 100 + "%",
    fiveStar: (fiveStartIndex / totalUsers) * 100 + "%"
  };
  return reviewScores;
}

function RatingApp(review) {
  //  setReview();
  let reviewScores = getScoreInPercentage();

  const styles = {
    fiveStar: {
      width: reviewScores.fiveStar
    },
    fourStar: {
      width: reviewScores.fourStar
    },
    threeStar: {
      width: reviewScores.threeStar
    },
    twoStar: {
      width: reviewScores.twoStar
    },
    oneStar: {
      width: reviewScores.oneStar
    }
  };
  return (
    <div className="row row-pading">
      <div className="col-4">
        <span>
          <b>CUSTOMER REVIEWS</b>
        </span>
        <br />
        <span>
          by <b>Roadie</b>
        </span>
        <br />
        <div className="row">
          <div className="col-12">
            <div className="side">
              <div>5 star</div>
            </div>
            <div className="middle">
              <div className="bar-container">
                <div style={styles.fiveStar} className="bar-5"></div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="side">
              <div>4 star</div>
            </div>
            <div className="middle">
              <div className="bar-container">
                <div style={styles.fourStar} className="bar-4"></div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="side">
              <div>3 star</div>
            </div>
            <div className="middle">
              <div className="bar-container">
                <div style={styles.threeStar} className="bar-3"></div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="side">
              <div>2 star</div>
            </div>
            <div className="middle">
              <div className="bar-container">
                <div style={styles.twoStar} className="bar-2"></div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="side">
              <div>1 star</div>
            </div>
            <div className="middle">
              <div className="bar-container">
                <div style={styles.oneStar} className="bar-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-8">
        <div className="row">
          {reviews.map((review, i) => {
            return (
              <div className="col-5 rating-box">
                <span>{review.revieweTitle} </span>
                <br />
                <div>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star"></span>
                </div>
                <span>
                  by {review.reviewedBy} on {review.reviewedDate}
                </span>
                <br />
                <span>{review.revieweDesc}.</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default RatingApp;
