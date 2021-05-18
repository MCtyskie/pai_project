import React from "react";
import axios from 'axios';
import { ReviewItem } from "./ReviewItem";

class ReviewView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviewsList: [],
            isFetchingData: false,
        }
        this.fetchReviews = this.fetchReviews.bind(this);
        this.prepareReviewsView = this.prepareReviewsView.bind(this);
    }

    componentDidMount() {
        console.log("loaded Invitation view");
    }

    fetchReviews() {
        // TODO check name implemented in backend
        const backend_url = "http://localhost:8081/api/reviews/reviewed";
        axios.get(backend_url, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token').substring(1).slice(0, -1)}`,
            }
        })
            .then(response => {
                console.log(response.data);
                this.setState({ reviewsList: response.data, isFetchingData: false });
            })
            .catch(err => {
                console.log(err);
                this.setState({ isFetchingData: false });
            })
    }

    prepareReviewsView() {
        let reviewPage = [];
        this.state.reviewsList.forEach(reviewItem => {
            reviewPage.push(<ReviewItem review={reviewItem}></ReviewItem>);
        })
        return reviewPage;
    }

    render() {
        // TODO Design view and implement
        return (
            <div>
                {this.state.isFetchingData ? "fetching data..." : this.prepareReviewsView()}
            </div>
        );
    }
}

export { ReviewView };