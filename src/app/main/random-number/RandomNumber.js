import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Icon from '@material-ui/core/Icon';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    diplay: 'flex',
    flex: '1 1 auto',
    backgroundColor: theme.palette.background.paper,
    padding: '6rem'
  },
  gridList: {
    flex: '1 1 auto',
  },
  media: {
    height: 240,
    width: 240,
    margin: 'auto'
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}));

const tileData = [
  {
    "id": "rock",
    "img": "assets/images/game/rock.png"
  },
  {
    "id": "paper",
    "img": "assets/images/game/paper.png"
  },
  {
    "id": "sissors",
    "img": "assets/images/game/sissors.png"
  }
]

export default function RandomNumber() {
  const classes = useStyles();

  const [choice, setChoice] = useState("question_mark_human");

  const handleChange = (e) => {
    setChoice(e.target.name)
  }

  const [resultText, setResultText] = useState("");
  const [comChoice, setComChoice] = useState("assets/images/game/question_mark_com.png");

  const deal = () => {
    if (choice === "question_mark_human") {
      alert("Please select your choice!")
    } else {
      axios.get('http://localhost:3600/randomNumber')
        .then(res => {
          setComChoice(tileData[res.data].img)
          if ((choice === "rock" && res.data === 2) ||
              (choice === "paper" && res.data === 0) ||
              (choice === "sissors" && res.data === 1))
            setResultText("You Win !!!")
          else if (choice === tileData[res.data].id)
            setResultText("Draw, Try again.")
          else
            setResultText("You Lose !")
        })
        .catch(err => console.log(err));
    }
  }

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cellHeight={'auto'} cols={3} spacing={100}>

        {tileData.map((tile) => (
          <GridListTile key={tile.id} cols={tile.cols || 1}>
            <div className='flex-1 items-center'>
              <img name={tile.id} src={tile.img}  onClick={handleChange} style={{margin: 'auto'}}/>
            </div>
          </GridListTile>
        ))}

        <GridListTile cols={1}>
          <Card>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={"assets/images/game/" + choice + ".png"}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2" className="text-center">
                  Your Choice
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </GridListTile>

        <GridListTile cols={1}>
          <div style={{height: '6rem'}}></div>
          <div className={classes.center}>
            <Button
              variant="contained"
              color="primary"
              endIcon={<Icon>send</Icon>}
              onClick={deal}
            >
              DEAL
            </Button>
          </div>
          <Typography gutterBottom variant="h2" component="h2" className="text-center">
            {resultText}
          </Typography>
        </GridListTile>

        <GridListTile cols={1}>
          <Card>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={comChoice}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2" className="text-center">
                  Computer Choice
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </GridListTile>
      </GridList>
    </div>
  );
}