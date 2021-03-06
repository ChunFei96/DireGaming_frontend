import React, {useState, useEffect}  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import GridTile from './GridTile'
import { render } from 'react-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
  }));

  export default function WeatherGridLine({ getTileArr, removeTile} ){

    const [tileArr, setTileArr] = useState([])
    const classes = useStyles();

   
    useEffect(()=> {
        setTileArr(getTileArr)

    }, [getTileArr])

    return (
     
        <div className={classes.root}>
          <GridList className={classes.gridList} style={ {
            height:510,
            margin: 20,
            width: '100%',
        }}>
            {tileArr.map((tile) => (
              <GridTile key ={tile.key} tile = {tile} removeTile={ (tile) => {removeTile(tile)} } />
            ))}
          </GridList>
        </div>
      );

  }