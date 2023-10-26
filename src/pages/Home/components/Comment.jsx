import { Avatar, Button, Card, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { getCommentDetail } from "../../../core/services/comment";
import icons from "../../../assets/icons";
import { convertTimestamp } from "../../../helper/convertTimestamp";
import { getUser } from "../../../core/services/user";
import { useSelector } from "react-redux";
const { HeartIcon, CommentIcon, ShareIcon, EyeIcon, ExpandIcon, HappyIcon, SendIcon, ATIcon } = icons;

export const Comment = ({ data }) => {
    const [commentDetail, setCommentDetail] = React.useState(null);

    React.useEffect(() => {
        if (data) {
            getCommentDetail(data)
                .then((res) => {
                    // {
                    //     "content": "Test comment 2",
                    //     "liked": 0,
                    //     "createAt": "2023-10-26T07:33:42.144Z",
                    //     "updatedAt": "",
                    //     "disliked": 0,
                    //     "replyTo": "",
                    //     "postId": "Title-db8ba1f9-c866-4d31-bd25-995516ee2b75",
                    //     "id": "2bcajcachb",
                    //     "creatorId": "google_104220816706399959797"
                    // }
                    setCommentDetail(res);
                })
                .catch((err) => console.err(err))
        }
    }, [data]);

    const [commenter, setCommenter] = React.useState(null);
    React.useEffect(() => {
        if (commentDetail) {
            getUser(commentDetail.creatorId)
                .then((res) => {
                    setCommenter(res)
                })
                .catch((err) => console.err(err))
        }
    }, [commentDetail])

    return (
        <Card
            borderWidth={0}
            borderRadius={20}
            boxShadow='none'
            width='100%'
        >
            <Flex
                flexDirection='row'
                columnGap={3}
                paddingX={5}
                paddingTop={5}
                paddingBottom={3}
            >
                <Avatar src={commenter?.avatar} />
                <Flex
                    flexDirection='column'
                    flex={1}
                >
                    <Flex
                        flexDirection='row'
                        columnGap={2}
                        justifyContent='space-between'
                    >
                        <Text color='gray.500' marginX={3} textAlign='left' fontSize='small' fontWeight='semibold'>{commenter?.username ? commenter?.username : '_'}</Text>
                        <Text color='gray.500' marginX={3} textAlign='left' fontSize='x-small'>{convertTimestamp(commentDetail?.createAt) ? convertTimestamp(commentDetail?.createAt) : ''}</Text>
                    </Flex>
                    <Text marginX={3} textAlign='left' fontSize='small'>{commentDetail?.content ? commentDetail?.content : ''}</Text>

                    <Flex
                        flexDirection='row'
                        justifyContent='space-between'
                    >
                        <Flex
                            flexDirection='row'
                            columnGap={1}
                        >
                            <Button backgroundColor='transparent' _hover={{ backgroundColor: 'transparent' }} width='40px' padding={0} height='40px' leftIcon={<HappyIcon width={20} height={20} />} iconSpacing={0}></Button>
                        </Flex>
                        {/* <Button backgroundColor='transparent' _hover={{ backgroundColor: 'transparent' }} width='40px' padding={0} height='40px' leftIcon={<SendIcon width={20} height={20} />} iconSpacing={0}></Button> */}
                    </Flex>
                </Flex>
            </Flex>

        </Card>
    );
}