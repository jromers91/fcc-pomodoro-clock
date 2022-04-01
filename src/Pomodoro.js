import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import useSound from 'use-sound';
import BeepSound from './sound/BeepSound.wav';

const Pomodoro = () => {
    const [label, setLabel] = useState('Study');
    const [sessionMinutes, setSessionMinutes] = useState(25);
    const [count, setCount] = useState(5);
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const [play, {stop}] = useSound(BeepSound);

    const Increment = () => {
        setCount((prevCount) => prevCount + 1)
        if (count === 60) {
            setCount(60);
        }
    }

    const Decrement = () => {
        setCount((prevCount) => prevCount - 1)
        if (count === 1) {
            setCount(1);
        }
    }

    const sessionIncrement = () => {
        if(!isRunning) {
            setSessionMinutes((prevCount) => prevCount + 1)
                if (sessionMinutes === 60) {
                     setSessionMinutes(60);
        }        else {
                    setMinutes(sessionMinutes + 1);
                    setSeconds(0);
        }
        }
    }

    const sessionDecrement = () => {
        if(!isRunning) {
            setSessionMinutes((prevCount) => prevCount - 1)
        if (sessionMinutes === 1) {
            setSessionMinutes(1);
            setMinutes(1);
        } else {
            setMinutes(sessionMinutes - 1);
            setSeconds(0);
        }
        }
    }

    const twentyFive = () => {
        setIsRunning(false);
        setMinutes(25);
        setSeconds(0);
        setSessionMinutes(25);
        setCount(5);
        setLabel('Study');
        stop();
    }
    const breakTime = () => {
        setIsRunning(true);
        setMinutes(count);
        setSeconds(0);
    }

    const studyTime = () => {
        setIsRunning(true);
        setMinutes(sessionMinutes);
        setSeconds(0);
    }
    useEffect(() => {
        if (isRunning) {
            let interval = setInterval(() => {
            clearInterval(interval);
            if (seconds === 0) {
                if (minutes !== 0) {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
                else {
                    setSeconds(seconds);
                    setMinutes(minutes);
                }
            }
            else {
                setSeconds(seconds - 1)
            }
        }, 1000) 
        if (seconds === 0 && minutes === 0) {
            if (label === 'Study') {
                setMinutes(count);
                setIsRunning(true);
                setLabel('Break')
                play();
            } if (label === 'Break') {
                setMinutes(sessionMinutes);
                setIsRunning(true);
                setLabel('Study');
                play();
            }
    }
        return () => clearInterval(interval)     
        }
    }, [isRunning, minutes, seconds, count, label, setLabel, sessionMinutes, play]);
    return (
        <div>
            <div className="timer">
                <div className="digits">
                <p id="timer-label">{label}</p>         
                <p id="time-left">{timerMinutes}:{timerSeconds}</p>
                </div>
                <Button variant="contained" id="start_stop" onClick={() => setIsRunning(true)}>Start</Button>
                <Button variant="outlined" id="reset" onClick={() => twentyFive()}>Reset</Button>
                <Button variant="contained" id="start_stop" onClick={() => setIsRunning(false)}>Pause</Button>
            </div>
            <div className='menu'>
            <div className='labels'>
                <p id="break-label">Break Length</p>
                <p id="session-label">Study Length</p>
            </div>
            <div className="break">
                <div className='container'>
                <Button variant="outlined" id="break-decrement" onClick={() => Decrement()}>-</Button>
                <span className="break-digit" id="break-length">{count}</span>
                <Button variant="outlined" id="break-increment" onClick={() => Increment()}>+</Button>
                </div>
                <Button variant="contained" onClick={() => breakTime()}>Set Break Time</Button>
                </div>
                <div className='study'>
                <div className='container'>
                <Button variant="outlined" id="session-decrement" onClick={() => sessionDecrement()}>-</Button>
                <span className="break-digit" id="session-length">{sessionMinutes}</span>
                <Button variant="outlined" id="session-increment" onClick={() => sessionIncrement()}>+</Button>
                </div>
                <Button variant="contained" onClick={() => studyTime()}>Set Study Time</Button>
            </div>
            </div>
            <audio id="beep" src={BeepSound}></audio>
        </div>
    )
}

export default Pomodoro