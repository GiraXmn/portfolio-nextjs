'use client'

import styles from '../styles/hero.module.scss'
import Navbar from './navbar'
import React, { useEffect, useState, useRef, useCallback } from 'react'
import utilities from '../lib/util'
import usePrefersReducedMotion from '../hooks/usePreferesReducedMotion'
import ShadowText from './shadow-text'
import { inter, noto_sans, roboto_mono } from '../app/fonts'
const { setCustomProperties, toCartesianCoords } = utilities

export default function Hero() {

  const reduceMotion = usePrefersReducedMotion();
  const [save, setSave] = useState(false);
  const heroElement = useRef<HTMLDivElement>(null);
  const [factor, setFactor] = useState<{
    x: number;
    y: number;
  }>({
    x: 1,
    y: 1
  });


  const handleMouseMove = (event) => {
    const x = (event.clientX - (window.innerWidth / 2)) / (window.innerWidth / 2)
    const y = (event.clientY - (window.innerHeight / 2)) / (window.innerHeight / 2)
    setCustomProperties({
      'mouse-x': `${x}`,
      'mouse-y': `${y}`,
    })
  }


  const setShadow = ({ x, y }) => {
    setCustomProperties({
      'shadow-x': `${x}px`,
      'shadow-y': `${y}px`
    })
  }

  const resetMouse = () => {
    setShadow({ x: 1 / 4, y: 1 / 4 })
    setFactor({ x: 1, y: 1 })
    setSave(false)
  }

  const handleTouch = ({ touches }) => {
    const { clientX, clientY } = touches[0]
    const { x, y } = toCartesianCoords({ x: clientX, y: clientY })
    setShadow({
      x: x * 2,
      y: y * 2
    })
  }

  useEffect(() => {
    const { x, y } = factor
    setCustomProperties({
      'factor-x': `calc(${x}em / 16)`,
      'factor-y': `calc(${y}em / 8)`
    })

  }, [factor]);

  useEffect(() => {
    const hero = heroElement.current
    if (!hero) return

    const handleScroll = (event: WheelEvent) => {
      event.preventDefault()
      const { deltaX, deltaY } = event
      const { x, y } = factor
      const factorX = x + deltaX / 100
      const factorY = y + deltaY / 100
      setFactor({
        x: factorX,
        y: factorY
      })
    }

    // todo move reduceMotion to css
    if (!reduceMotion) {
      hero.addEventListener('wheel', handleScroll, { passive: false })
    }

    return () => {
      hero.removeEventListener('wheel', handleScroll)
    };
  }, [reduceMotion, factor]);

  return (
    <ShadowText textClass={styles.hero}>
      <h1 id="name" className={styles.cmyk}>
        <span className={`${inter.variable}`}>X</span>&nbsp;imena
        <br />
        Andrade
      </h1>
      {/* <h2 className={styles.cmyk}>
          Creative Technologist
        </h2> */}
      <Navbar theme='home' />
    </ShadowText>
  )
}