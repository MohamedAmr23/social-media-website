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
import { Post } from '../../../interfaces/postinterface.js';
import Image from 'next/image.js';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import CommentIcon from '@mui/icons-material/Comment';
import { Button } from '@mui/material';
import Link from 'next/link.js';


interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

export default function PostDetails({postD , allComments=false}:{postD:Post , allComments?:boolean}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{m:2 , p:2 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] , cursor:'pointer' }} aria-label="recipe">
            <Image src={postD.user.photo} alt={postD.user.name} height={300} width={500}/>
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={postD.user.name}
        subheader={postD.createdAt.split('').slice(0,10).join('')}
        titleTypographyProps={{width:'fit-content',style:{cursor:'pointer'}}}
      />
        <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
         {postD.body}
        </Typography>
      </CardContent>
      {postD.image && <CardMedia
        component="img"
        height="194"
        image={postD.image}
        alt={''}
      />}
    
      <CardActions sx={{width:'80%',mx:'auto',display:'flex',justifyContent:'space-around'}} >
        <IconButton aria-label="add to favorites">
          <ThumbUpAltIcon/>
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
           <CommentIcon/>
        </ExpandMore>
        
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
       
      </CardActions>
      {postD.comments.length > 0 && !allComments ? <Collapse sx={{backgroundColor:'#eee'}} in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] , cursor:'pointer' }} aria-label="recipe">
            <Image src={postD.comments[0].commentCreator.photo} alt={postD.comments[0].commentCreator.name} height={300} width={500}/>
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={postD.comments[0].commentCreator.name}
        subheader={postD.comments[0].createdAt.split('').slice(0,10).join('')}
        titleTypographyProps={{width:'fit-content',style:{cursor:'pointer'}}}
      />
          <Typography sx={{ ps:4 }}>
            {postD.comments[0].content}
          </Typography>
          <Link href={'/single/'+postD._id}><Button variant='text'>View All Comments</Button></Link>
        </CardContent>
      </Collapse>:
      <Collapse sx={{backgroundColor:'#eee'}} in={expanded} timeout="auto" unmountOnExit>
        {postD.comments.map((comment)=> <CardContent key={comment._id}>
        <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] , cursor:'pointer' }} aria-label="recipe">
            <Image src={comment.commentCreator.photo} alt={comment.commentCreator.name} height={300} width={500}/>
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={comment.commentCreator.name}
        subheader={comment.createdAt.split('').slice(0,10).join('')}
        titleTypographyProps={{width:'fit-content',style:{cursor:'pointer'}}}
      />
          <Typography sx={{ ps:4 }}>
            {comment.content}
          </Typography>
        </CardContent>)}
      </Collapse>}
    </Card>
  );
}
