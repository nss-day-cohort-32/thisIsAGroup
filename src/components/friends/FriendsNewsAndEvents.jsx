import React, { Component } from 'react'
import EventItem from '../events/EventItem'
import NewsItem from '../news/NewsItem'
import API from '../../modules/dbCalls'
import { Grid, Paper } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export default class FriendsNewsAndEvents extends Component {
    state = {
        news: [],
        events: [],
        UserWantsNews: 0

    }

    makeNews = news => news.map(item => <NewsItem key={item.id} item={item} />);

    makeEvent = events => events.map(item => <EventItem key={item.id} item={item} />);


    async componentDidMount() {

        let friendsNews = await API.getFriendsNews(sessionStorage.getItem("activeUser")).catch((_error) => [])
        let friendsEvents = await API.getFriendsEvents(sessionStorage.getItem("activeUser")).catch((_error) => [])

        const newsArray = []
        friendsNews.forEach(friend => friend.news.forEach(news => newsArray.push(news)))

        const eventsArray = []
        friendsEvents.forEach(friend => friend.events.forEach(event => eventsArray.push(event)))

        const newState = {
            news: newsArray,
            events: eventsArray
        }
        this.setState(newState)
    }

    handleChange = (_event, tabValue) => {
        this.setState({ UserWantsNews: tabValue })
    }
    render() {
        return (
            <Paper>

                <Tabs
                    onChange={this.handleChange}
                    value={this.state.UserWantsNews}
                    centered
                >
                    <Tab value={0} label="News" />
                    <Tab value={1} label="Events" />
                </Tabs>
                <Grid container spacing={2} alignItems="stretch" className="newsContainer" wrap="wrap" direction="column">
                    {!!this.state.UserWantsNews ? this.makeEvent(this.state.events) : this.makeNews(this.state.news)}
                </Grid>
            </Paper>
        )
    }
}
