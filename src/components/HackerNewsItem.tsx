import styled from "styled-components"
import { FiExternalLink } from "react-icons/fi"

// custom Types
import { HackerStoryDataType } from "../screens/HackerNewsPage"

const HackerItemContainer = styled.div`
    padding:12px;
    border:1px solid gray;
    border-radius:5px;
`
const HackerItemTitle = styled.div`
    font-size:13px;
    font-weight:500;
    padding-bottom:4px;
    color:#383737;
`

const HackerItemContent = styled.div`
    display:flex;
    justify-content:space-between;
`
const HackerItemAuther = styled.div`
    font-size:12px;
    color:#383737;

`

const HackerItemLink = styled.a`
    font-size:12px;
    cursor:pointer;
    color:#747171;

    &:hover {
        color:#0a0a0a;
    }
`

/**
 * HackerNewsItem is rendering HackerNews Content...
 * @param props is including title, auther, online-link
 */
export const HackerNewsItem: React.FC<HackerStoryDataType> = (props) => {
    return <HackerItemContainer>
        <HackerItemTitle>
            {props.title}
        </HackerItemTitle>
        <HackerItemContent >
            <HackerItemAuther>#{props.by}</HackerItemAuther>
            <HackerItemLink href={props.url} target='_blank'>
                <FiExternalLink />
            </HackerItemLink>
        </HackerItemContent>
    </HackerItemContainer>
}