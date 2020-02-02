import React from "react";
import ReactDOM from "react-dom";

import Modal from "react-modal";


import "./index.css";

import * as serviceWorker from "./serviceWorker";

const customStyles = {
    content: {
        width: "60%",
        height: "90%",
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)"
    }
};

class ModelApp extends React.Component {
    constructor(props) {
        super(props);

        this.handleScoreChange = this.handleScoreChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.refreshListFiveStar = this.refreshListFiveStar.bind(this);
        this.refreshListFourStar = this.refreshListFourStar.bind(this);
        this.refreshListThreeStar = this.refreshListThreeStar.bind(this);
        this.refreshListTwoStar = this.refreshListTwoStar.bind(this);
        this.refreshListOneStar = this.refreshListOneStar.bind(this);

        this.reviewsCount = 4;
        this.averageRatingScore = 4;
        this.state = {
            modalIsOpen: false,
            reviewedBy: '',
            revieweTitle:'',
            ratingScore: '',
            revieweDesc:'',
            reviewedDate :'',
            listToShow : -1
        };

        this.reviews = [
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

        this.styles = {
            fiveStar: {
                width: 0
            },
            fourStar: {
                width: 0
            },
            threeStar: {
                width: 0
            },
            twoStar: {
                width: 0
            },
            oneStar: {
                width: 0
            }
        };

        this.review = {
            reviewedBy: "",
            ratingScore: "",
            revieweTitle: "",
            revieweDesc: "",
            reviewedDate: ""
        };

        

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.submitModal = this.submitModal.bind(this);
        this.cancelModal = this.cancelModal.bind(this);
    }

    getScoreInPercentage() {
        var totalUsers = this.reviews.length;

        this.reviewsCount = totalUsers;
        

        console.log('totalUsers = '+totalUsers);
        var oneStartIndex = 0,
            twoStartIndex = 0,
            threeStartIndex = 0,
            fourStartIndex = 0,
            fiveStartIndex = 0;

        for (var review in this.reviews) {
           
            var reviewJSON = this.reviews[review];
            console.log("ratingScore =" + reviewJSON.ratingScore);
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

        let averageRatingScore = (5*fiveStartIndex + 4*fourStartIndex + 3*threeStartIndex + 2*twoStartIndex + 1*oneStartIndex) / (fiveStartIndex+fourStartIndex+threeStartIndex+twoStartIndex+oneStartIndex) ;
        this.averageRatingScore =averageRatingScore.toFixed(2);
        console.log("fiveStartIndex =" + fiveStartIndex);
        var reviewScores = {
            oneStar: (oneStartIndex / totalUsers) * 100 + "%",
            twoStar: (twoStartIndex / totalUsers) * 100 + "%",
            threeStar: (threeStartIndex / totalUsers) * 100 + "%",
            fourStar: (fourStartIndex / totalUsers) * 100 + "%",
            fiveStar: ((fiveStartIndex / totalUsers) * 100 )+ "%"
        };
        return reviewScores;
    }

    refreshListFiveStar(){
       // this.getScoreInPercentage();
       this.setState({listToShow : 5});
        
    }

    refreshListFourStar(){
        // this.getScoreInPercentage();
        this.setState({listToShow : 4});
         
     }

     refreshListThreeStar(){
        // this.getScoreInPercentage();
        this.setState({listToShow : 3});
         
     }

     refreshListTwoStar(){
        // this.getScoreInPercentage();
        this.setState({listToShow : 2});
         
     }

     refreshListOneStar(){
        // this.getScoreInPercentage();
        this.setState({listToShow : 1});
         
     }


    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = "#f00";
    }

    submitModal() {

       
        console.log('review = '+ JSON.stringify(this.state));
        this.setState({ modalIsOpen: false });

        var review ={
            reviewedBy: this.state.reviewedBy,
            revieweTitle:this.state.revieweTitle,
            ratingScore: (this.state.ratingScore ? parseInt(this.state.ratingScore) : 1),
            revieweDesc:this.state.revieweDesc,
            reviewedDate: new Date().toLocaleString()
        };

        this.reviews.push(review);

        let reviewScores = this.getScoreInPercentage();

        this.styles ={
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

        this.setState({ modalIsOpen: false,  
            reviewedBy: '',
        revieweTitle:'',
        ratingScore: '',
        revieweDesc:'',
        revieweDate : ''});

    }

    cancelModal() {
        this.setState({ modalIsOpen: false,  
            reviewedBy: '',
        revieweTitle:'',
        ratingScore: '',
        revieweDesc:'',
        revieweDate : ''});
    }

    handleScoreChange(event) {

        var score;

        if(event.target.value) score = event.target.value;
        else score = 1;

        this.setState(
            {ratingScore : score}
        );
        console.log("This is the form change function inside -Form-");
    }

    handleNameChange(event) {

        this.setState(
            {reviewedBy : event.target.value}
        );
    }

    handleDescChange(event) {
        this.setState(
            {revieweDesc : event.target.value}
        );
        
    }

    handleTitleChange(event) {
        this.setState(
            {revieweTitle : event.target.value}
        );
    }

    render() {

        let reviewScores = this.getScoreInPercentage();

        this.styles = {
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
            <div>
                <div className="row row-black"></div>
                <div className="row row-height-20"></div>
                <div className="row">
                    <div className="col-4"><img src="./Software-Box-Mock-Up.jpg" alt="Cinque Terre" width="300" height="300" /></div>
                    <div className="col-8">
                        <span><b>ROADIE COMMUNICATOR - INCLUDES INSTALLATION SOFTWARE</b></span><br />
                        <span>by <b>Roadie</b></span><br />
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </span><br />
                        <span>• Duis ante irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</span>
                        <div className="div-float-right"></div>
                        <div className="btn-float-right">
                            <button
                                className="btn btn-primary btn-space"
                                onClick={this.openModal}
                            >
                                Open Modal
         </button>
                            <button type="button" className="btn btn-primary btn-space">
                                ADD TO CART
         </button>
                        </div>

                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onAfterOpen={this.afterOpenModal}
                            onRequestClose={this.submitModal}
                            style={customStyles}
                            contentLabel="Example Modal"
                        >
                            <h2 ref={subtitle => (this.subtitle = subtitle)}>ADD REVIEW</h2>

                            <form>
                                <div className="form-group">
                                    <label>Rating</label>
                                    <select
                                        value={this.state.ratingScore}
                                        onChange={this.handleScoreChange}
                                        className="form-control"
                                        defaultValue="1"
                                        id="rating"
                                    >
                                        <option value="1">One Star</option>
                                        <option value="2">Two Star</option>
                                        <option value="3">Three Star</option>
                                        <option value="4">Four Star</option>
                                        <option value="5">Five Star</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Your Name</label>
                                    <input
                                        value={this.state.reviewerName}
                                        type="text"
                                        onChange={this.handleNameChange}
                                        className="form-control"
                                        placeholder="Enter text here"
                                        defaultValue=""
                                        id="name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Review Title</label>
                                    <input
                                        value={this.state.revieweTitle}
                                        type="text"
                                        onChange={this.handleTitleChange}
                                        className="form-control"
                                        placeholder="Enter text here"
                                        id="reviewTitle"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Write your review here</label>
                                    <textarea
                                        value={this.state.revieweDesc}
                                        onChange={this.handleDescChange}
                                        className="form-control"
                                        placeholder="Enter text here"
                                        id="reviewDesc"
                                    ></textarea>
                                </div>
                            </form>
                            <div className="btn-float-right">
                                <button
                                    className="btn btn-primary btn-space"
                                    onClick={this.cancelModal}
                                >
                                    Cancel
           </button>
                                <button className="btn btn-primary" onClick={this.submitModal}>
                                    Submit
           </button>
                            </div>
                        </Modal>
                    </div>

                </div>
            

            <div className="row row-height-20"></div>

            <div className="row row-pading">
                <div className="col-4">
                    <span>
                        <b>CUSTOMER REVIEWS</b>
                    </span>
                    <br />
                    
                    <div className="row row-pading"> 
                    <span className={this.averageRatingScore >= 1 ? 'fa fa-star checked' : 'fa fa-star'}></span>
                                        <span className={this.averageRatingScore >= 2 ? 'fa fa-star checked' : 'fa fa-star'}></span>
                                        <span className={this.averageRatingScore >= 3 ? 'fa fa-star checked' : 'fa fa-star'}></span>
                                        <span className={this.averageRatingScore >= 4 ? 'fa fa-star checked' : 'fa fa-star'}></span>
                                        <span className={this.averageRatingScore >= 5 ? 'fa fa-star checked' : 'fa fa-star'}></span>
                                        <span>&nbsp;&nbsp;{this.averageRatingScore} out of 5</span>
                                        </div>
                                        <div className="row row-pading">{this.reviewsCount} reviews</div>
                    <div className="row ">
                        <div className="col-12">
                            <div className="side">
                                <div><button type="button" className="btn btn-link" onClick={this.refreshListFiveStar}>5 star</button></div>
                            </div>
                            <div className="middle">
                                <div className="bar-container">
                                    <div style={this.styles.fiveStar} className="bar-5"></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="side">
                            <div><button type="button" className="btn btn-link" onClick={this.refreshListFourStar}>4 star</button></div>
                            </div>
                            <div className="middle">
                                <div className="bar-container">
                                    <div style={this.styles.fourStar} className="bar-4"></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="side">
                            <div><button type="button" className="btn btn-link" onClick={this.refreshListThreeStar}>3 star</button></div>
                            </div>
                            <div className="middle">
                                <div className="bar-container">
                                    <div style={this.styles.threeStar} className="bar-3"></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="side">
                            <div><button type="button" className="btn btn-link" onClick={this.refreshListTwoStar}>2 star</button></div>
                            </div>
                            <div className="middle">
                                <div className="bar-container">
                                    <div style={this.styles.twoStar} className="bar-2"></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="side">
                            <div><button type="button" className="btn btn-link" onClick={this.refreshListOneStar}>1 star</button></div>
                            </div>
                            <div className="middle">
                                <div className="bar-container">
                                    <div style={this.styles.oneStar} className="bar-1"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-8">
                    <div className="row">
                        {this.reviews.map((review, i) => {
                             if(this.state.listToShow === -1){
                                return (
                                    <div className="col-5 rating-box" key={i}>
                                        <span>{review.revieweTitle} </span>
                                        <br />
                                        <div>
                                            <span className={review.ratingScore >= 1 ? 'fa fa-star checked' : 'fa fa-star'}></span>
                                            <span className={review.ratingScore >= 2 ? 'fa fa-star checked' : 'fa fa-star'}></span>
                                            <span className={review.ratingScore >= 3 ? 'fa fa-star checked' : 'fa fa-star'}></span>
                                            <span className={review.ratingScore >= 4 ? 'fa fa-star checked' : 'fa fa-star'}></span>
                                            <span className={review.ratingScore >= 5 ? 'fa fa-star checked' : 'fa fa-star'}></span>
                                        </div>
                                        <span>
                                            by {review.reviewedBy} on {review.reviewedDate}
                                        </span>
                                        <br />
                                        <span>{review.revieweDesc}.</span>
                                    </div>
                                );
                            }else if(this.state.listToShow === review.ratingScore){
                                return (
                                    <div className="col-5 rating-box" key={i}>
                                        <span>{review.revieweTitle} </span>
                                        <br />
                                        <div>
                                            <span className={review.ratingScore >= 1 ? 'fa fa-star checked' : 'fa fa-star'}></span>
                                            <span className={review.ratingScore >= 2 ? 'fa fa-star checked' : 'fa fa-star'}></span>
                                            <span className={review.ratingScore >= 3 ? 'fa fa-star checked' : 'fa fa-star'}></span>
                                            <span className={review.ratingScore >= 4 ? 'fa fa-star checked' : 'fa fa-star'}></span>
                                            <span className={review.ratingScore >= 5 ? 'fa fa-star checked' : 'fa fa-star'}></span>
                                        </div>
                                        <span>
                                            by {review.reviewedBy} on {review.reviewedDate}
                                        </span>
                                        <br />
                                        <span>{review.revieweDesc}.</span>
                                    </div>
                                );
                            }
                        })}
                    
                    </div>
                </div>
            </div>
       </div >
    );
    }
}

ReactDOM.render(<ModelApp/>, document.getElementById("root"));

serviceWorker.unregister();
export default ModelApp;
