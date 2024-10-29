import {
  Control,
  Scale,
  Zoom,
  Fullscreen,
  MouseLocation,
  Logo,
  MapTheme,
} from '@antv/l7'
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'

export default (scene, map) => {
  const zoom = new Zoom({
    position: 'topleft',
  })
  const fullscreen = new Fullscreen({
    position: 'topright',
  })
  const scale = new Scale({
    position: 'rightbottom',
  })
  const mouseLocation = new MouseLocation({
    position: 'rightbottom',
  })
  const logo = new Logo({
    position: 'leftbottom',
    href: 'http://www.x-zd.com',
    img: 'http://www.x-zd.com/themes/simpleboot3_web/public/web/images/image/logo_03.png',
  })
  const mapTheme = new MapTheme({
    position: 'topright',
    options: [
      {
        text: '白天导航地图',
        value: 'mapbox://styles/mapbox/navigation-day-v1',
        img: '/themes/navigation-day-v1.png',
      },
      {
        text: '夜间导航地图',
        value: 'mapbox://styles/mapbox/navigation-night-v1',
        img: '/themes/navigation-night-v1.png',
      },
      {
        text: '标记卫星图',
        value: 'mapbox://styles/mapbox/satellite-streets-v12',
        img: '/themes/satellite-streets-v12.png',
      },
      {
        text: '普通卫星图',
        value: 'mapbox://styles/mapbox/satellite-v9',
        img: '/themes/satellite-v9.png',
      },
    ],
  })
  const direction = new Control({
    name: 'direction',
    position: 'topleft',
  })
  const mapboxdirection = new MapboxDirections({
    accessToken: import.meta.env.VITE_TOKEN,
  })
  direction.onAdd = () => {
    const container = document.createElement('div')
    container.textContent = '导航'
    container.classList.add('l7-button-control')
    let showDirection = false
    container.addEventListener('click', () => {
      showDirection = !showDirection
      if (showDirection) {
        map.addControl(mapboxdirection, 'top-left')
      } else {
        map.removeControl(mapboxdirection)
      }
    })
    return container
  }
  const controls = {
    zoom,
    fullscreen,
    mapTheme,
    mouseLocation,
    scale,
    logo,
    direction,
  }

  for (const key in controls) {
    scene.addControl(controls[key])
  }

  scale.hide()

  map.on('zoom', () => {
    const nowZoom = map.getZoom()
    if (nowZoom < 5) scale.hide()
    else scale.show()
  })
}
