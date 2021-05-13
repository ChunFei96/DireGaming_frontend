import React, {useState, useEffect}  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import DataFetching from './DataFetching'
import ImagePicker from './ImagePicker'

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
    tileSize:{
        widht:500,
        height:700
    }
  }));

export default function GridTile({tile, removeTile}){
    const classes = useStyles();

    const [tile_, setTile] = useState(tile);
    useEffect(()=> {
        setInterval(() => {
            DataFetching(tile.cityName).then(result => {
                let updateTile = {key: result.data.sys.id, cityName: tile.cityName, weather:result.data.weather[0].main,
                              temperature:(result.data.main.temp - 273.15).toFixed(0).toString() + "C", 
                            img:ImagePicker(result.data.weather[0].main)};
                console.log(updateTile.cityName)
                setTile(updateTile)
              });
            
          }, tile.interval*1000);

    }, [])


    return(
        <GridListTile key={tile_.key} style={ {
            width: 500,
            height:500,
            marginRight:10
        }}>
        <img src={tile_.img} alt={tile_.cityName} />
            <GridListTileBar
            title={tile_.cityName}
            classes={{
                root: classes.titleBar,
                title: classes.title,
            }}
            
            actionIcon={
                <IconButton aria-label={`star ${tile_.cityName}`} onClick={() => removeTile(tile_)}>
                <StarBorderIcon className={classes.title} />
                </IconButton>
            }
            />
      </GridListTile>
    )
}