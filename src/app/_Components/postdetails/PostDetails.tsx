'use client';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import CommentIcon from '@mui/icons-material/Comment';
import { Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { Post } from '../../../interfaces/postinterface';

interface ExpandMoreProps extends IconButtonProps {
  $expanded: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { $expanded, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, $expanded }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  transform: $expanded ? 'rotate(180deg)' : 'rotate(0deg)',
}));

export default function PostDetails({
  postD,
  allComments = false,
}: {
  postD: Post;
  allComments?: boolean;
}) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Card sx={{ m: 2, p: 2 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500], cursor: 'pointer' }}>
            <Image
              src={postD.user.photo}
              alt={postD.user.name}
              height={40}
              width={40}
            />
          </Avatar>
        }
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title={postD.user.name}
        subheader={postD.createdAt.slice(0, 10)}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {postD.body}
        </Typography>
      </CardContent>

      {postD.image && (
        <CardMedia component="img" height="194" image={postD.image} />
      )}

      <CardActions
        sx={{
          width: '80%',
          mx: 'auto',
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <IconButton>
          <ThumbUpAltIcon />
        </IconButton>

        <ExpandMore
          $expanded={expanded}
          onClick={() => setExpanded(!expanded)}
        >
          <CommentIcon />
        </ExpandMore>

        <IconButton>
          <ShareIcon />
        </IconButton>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit sx={{ bgcolor: '#eee' }}>
        {(allComments ? postD.comments : postD.comments.slice(0, 1)).map(
          (comment) => (
            <CardContent key={comment._id}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }}>
                    <Image
                      src={comment.commentCreator.photo}
                      alt={comment.commentCreator.name}
                      height={40}
                      width={40}
                    />
                  </Avatar>
                }
                title={comment.commentCreator.name}
                subheader={comment.createdAt.slice(0, 10)}
              />
              <Typography sx={{ ps: 4 }}>{comment.content}</Typography>
            </CardContent>
          )
        )}

        {!allComments && postD.comments.length > 1 && (
          <Link href={`/single/${postD._id}`}>
            <Button>View All Comments</Button>
          </Link>
        )}
      </Collapse>
    </Card>
  );
}
