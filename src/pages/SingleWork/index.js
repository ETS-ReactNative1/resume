import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import renderHtml from 'react-render-html';
import { DiscussionEmbed, CommentCount } from 'disqus-react';

import { getWork } from '../../store/actions/worksAction';

class SingleWork extends Component {

	componentDidMount() {
		console.log(this.props.match.params.slug);
		console.log(process.env.PUBLIC_URL);
		this.props.getWork(this.props.match.params.slug);
	}

	renderWork = () => {
		return _.map(this.props.work, (work, key) => {
			const disqusShortname = "imron-reviady";
			const disqusConfig = {
				url: `${process.env.PUBLIC_URL}${this.props.match.url}`,
				identifier: this.props.match.params.slug,
				title: work.title,
			};
			return (
				<div className="fh5co-narrow-content" key={key}>
					<div className="row">
						<div className="col-md-12 animate-box fadeInLeft animated">
							<figure className="text-center">
								<img src={work.image} alt={work.title} className="img-responsive" />
							</figure>
						</div>
						<div className="col-md-8 col-md-offset-2 animate-box fadeInLeft animated">
							<div className="col-md-9 col-md-push-3">
								<h1>{work.title}</h1>
								{renderHtml(work.description)}
							</div>
							<div className="col-md-3 col-md-pull-9 fh5co-services">
								<h3>Category</h3>
								<ul>
									<li>{work.category}</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="row work-pagination animate-box fadeInLeft animated">
						<div className="col-md-8 col-md-offset-2 col-sm-12 col-sm-offset-0">
							<DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
						</div>
					</div>
				</div>
			)
		});
	}

	render() {
		return (
			<Fragment>
			{
				!this.props.loading &&
				<div>{this.renderWork()}</div>
			}
			{
				this.props.loading &&
				<div className="fh5co-narrow-content">
					<div className="row">
						<div>LOADING.....</div>
					</div>
				</div>
			}
			</Fragment>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		work: state.work.data,
		loading: state.work.loading
	}
}

export default connect(mapStateToProps, { getWork })(SingleWork);