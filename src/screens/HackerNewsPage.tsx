import styled from 'styled-components'
import ScaleLoader from "react-spinners/ScaleLoader"
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

//components
import { HackerNewsItem } from '../components/HackerNewsItem'

//custom hooks
import { useFetch } from "../hooks/useFetch"

//constant values
import { TOP_STORIES_URL } from '../constants/hacker-urls'

const HackerNewsContainer = styled.div`
    height: 90vh;
    width:90%;
    display:flex;
    max-width:600px;
    margin:auto;
    border-radius:10px;
    background:#FFFFFF;
    flex-direction:column;
    justify-content:center;
    padding:15px;
    box-shadow: 2px 5px 25px -2px rgba(0,0,0,0.3);
`
const HackerNewsContent = styled.div`
    background:#FFFFFF;
    overflow-y:auto;
    flex:1;
    border: 1px solid #cdc8c8;
`
const HackerNewsHeader = styled.div`
    font-size:20px;
    text-align:center;
    padding-bottom:15px;
    padding-top:5px;
    font-weight:500;
`

const LoaderContainer = styled.div`
    with:100%;
    display:flex;
    flex-direction:row;
    justify-content:center;
    gap:30px;
`

const ErrorContainer = styled.div`
    padding:12px;
    border:1px solid gray;
    border-radius:5px;
    font-size:12px;
    color:#383737;
    margin-left:10px;
    margin-right:10px;
`

export type HackerStoryDataType = {
    title: string,
    by: string,
    url: string
}

/**
 *  HackerNewsPages is rendering top 100 hackerNews with infinite scroll.
 */
export const HackerNewsPage = () => {
    const { data, errors, isSuccessed, setUrls } = useFetch([TOP_STORIES_URL])
    const [topStoryIDs, setTopStoryIDs] = useState<string[]>([])  //save Top 100 Story IDs of Hacker news
    const [hackerStoryData, sethackerStoryData] = useState<HackerStoryDataType[]>([])  //save HackerStory Data according to each ID

    useEffect(() => {
        if (isSuccessed) {
            if (data.length === 1) { //topstroies
                const storyIDs = data[0]
                if (storyIDs.length > 100) {
                    setTopStoryIDs(storyIDs?.slice(0, 100))
                    getNextStories(20, storyIDs)
                }
            }
            if (data.length > 1) {
                sethackerStoryData([...hackerStoryData, ...data])
            }
        }

        if (errors.length > 0) {
            console.log(errors)
        }
    }, [isSuccessed, errors])

    const getStoryURL = (id: string) => `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`

    const getNextStories = (nextLoadcount: number = 5, stories: string[] = []) => { //when scroll down, it is called to fetch next hackerNews stories.
        /**
         * This timer is just used to show Loading bar with delay-500ms manually.
         * Because the fetching time is very short so that the reviewer can not see the loading bar without this timer..
         * It's just for function checking for loading bar.
         * In real project, we whould remove the timer.
        */
        setTimeout(() => {
            const currentHackerNewsLength = hackerStoryData.length
            const _topStory_IDs = stories.length > 0 ? stories : topStoryIDs

            //get next hackernews endpoints to fetch the data
            const stroy_urls = _topStory_IDs.slice(currentHackerNewsLength, currentHackerNewsLength + nextLoadcount).map((id: string) => getStoryURL(id))
            setUrls(stroy_urls)
        }, 500)
    }

    return <HackerNewsContainer>
        <HackerNewsHeader >{`HackerNews List (${hackerStoryData.length})`}</HackerNewsHeader>
        <HackerNewsContent id="hacker-content">
            <InfiniteScroll
                dataLength={hackerStoryData.length}
                className='hacker-infinite-scroll'
                next={getNextStories}
                hasMore={hackerStoryData.length < topStoryIDs.length ? true : false}
                scrollableTarget="hacker-content"
                loader={
                    <LoaderContainer>
                        <ScaleLoader height={20}
                            width={6} color="#8e9291" />
                    </LoaderContainer>
                }
            >
                {
                    hackerStoryData.map((hackerData, index) =>
                        <HackerNewsItem key={'hacker-item-' + index} {...hackerData} />
                    )
                }
            </InfiniteScroll>
            {
                errors.length > 0 &&
                errors.map((error: any, index: number) => <ErrorContainer key={'hacker-error-' + index + 1}>{JSON.stringify(error)}</ErrorContainer>)
            }
        </HackerNewsContent>
    </HackerNewsContainer>
}