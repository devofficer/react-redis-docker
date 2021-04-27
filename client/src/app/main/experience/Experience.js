import React, { useState, useEffect } from 'react';
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
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    diplay: 'flex',
    flex: '1 1 auto',
    backgroundColor: theme.palette.background.paper,
    padding: '2rem'
  },
  gridList: {
    flex: '1 1 auto',
  },
  media: {
    height: 140,
  }
}));

export default function Experience() {
  const classes = useStyles();

  const [tileData, setTileData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3600/experience')
      .then(res => {
        setTileData(res.data)
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cellHeight={'auto'} cols={6} spacing={16}>
        {tileData.map((tile) => (
          <GridListTile key={tile.id} cols={tile.cols || 1}>
            <Card>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="/material-ui-static/images/cards/contemplative-reptile.jpg"
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {tile.company}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {tile.description}
                  </Typography>
                  <br/>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {'[' + tile.dateFrom + '] - [' + tile.dateTo + ']'}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Typography variant="body2" color="textSecondary" component="p">
                  {tile.role}
                </Typography>
              </CardActions>
            </Card>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}