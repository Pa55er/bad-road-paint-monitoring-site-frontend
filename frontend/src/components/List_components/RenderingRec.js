import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import UnsolvedList from './UnsolvedList';
import SolvedList from './SolvedList';
import Loader from '../Loader';
import './RenderingRec.css';

export default function RenderingRec({ userEmail, handleGPSChange }) {

    const [loading, setLoading] = useState(false);
    const [showUnsolved, setShowUnsolved] = useState(false);
    const [showSolved, setShowSolved] = useState(false);

    const navigate = useNavigate();
    const [indexUnsolved, setIndexUnsolved] = useState(1);
    const [pageUnsolved, setPageUnsolved] = useState(20000);
    const [unsolvedList, setUnsolvedList] = useState([]);
    const [indexSolved, setIndexSolved] = useState(1);
    const [pageSolved, setPageSolved] = useState(20000);
    const [solvedList, setSolvedList] = useState([]);
 
    const handleDataChange = (newData) => {
        setLoading(newData);
    };

    const childUnsolvedMove = () => {
        setShowUnsolved(false);
        setIndexUnsolved(1);
    };

    const childSolvedMove = () => {
        setShowSolved(false);
        setIndexSolved(1);
    };

    function handleShowUnsolved() {
        setShowSolved(false);
        loadingList1();
        setShowUnsolved(true);
    }

    async function loadingList1() {
        try {
            handleDataChange(true);
            const token = localStorage.getItem("token");
            const response1 = await axios.get(`/backend/list/unsolved/${indexUnsolved}`,
            {
                headers: {Authorization: token,},
            });
            if(response1.data.status === 40000) {
                localStorage.setItem("token", response1.data.token);
                alert("Out of boundary because of changes!\nreload list.\n");
                setShowUnsolved(false);
            }
            else if(response1.data.status === 401) {
                localStorage.removeItem("token");
                alert("You were automatically logged out because you haven't used it for 10 minutes!\nPlease log in again.\n");
                navigate("/signin", {
                    replace: true
                });
            }
            else if(response1.data.status === 403) {
                localStorage.removeItem("token");
                alert("Wrong approach!\nPlease log in again.\n");
                navigate("/signin", {
                    replace: true
                });
            }
            else {
                localStorage.setItem("token", response1.data.token);
                let jsonList1 = [];
                for(let i = 0; i < response1.data.data.length; i++) {
                    jsonList1.push(response1.data.data[i]);
                }
                setUnsolvedList(jsonList1);
                setPageUnsolved(response1.data.status);
            }
        } catch (error) {
            localStorage.removeItem("token");
            alert("Cannot connect with Backend server!\n");
            navigate("/signin", {
                replace: true
            });
        }
        handleDataChange(false);
    };

    function handleShowSolved() {
        setShowUnsolved(false);
        loadingList2();
        setShowSolved(true);
    }
    
    async function loadingList2() {
        try {
            handleDataChange(true);
            const token = localStorage.getItem("token");
            const response2 = await axios.get(`/backend/list/solved/${indexSolved}`,
            {
                headers: {Authorization: token,},
            });
            if(response2.data.status === 40000) {
                localStorage.setItem("token", response2.data.token);
                alert("Out of boundary because of changes!\nreload list.\n");
                setShowSolved(false);
            }
            else if(response2.data.status === 401) {
                localStorage.removeItem("token");
                alert("You were automatically logged out because you haven't used it for 10 minutes!\nPlease log in again.\n");
                navigate("/signin", {
                    replace: true
                });
            }
            else if(response2.data.status === 403) {
                localStorage.removeItem("token");
                alert("Wrong approach!\nPlease log in again.\n");
                navigate("/signin", {
                    replace: true
                });
            }
            else {
                localStorage.setItem("token", response2.data.token);
                let jsonList2 = [];
                for(let i = 0; i < response2.data.data.length; i++) {
                    jsonList2.push(response2.data.data[i]);
                }
                setSolvedList(jsonList2);
                setPageSolved(response2.data.status);
            }
        } catch (error) {
            localStorage.removeItem("token");
            alert("Cannot connect with Backend server!\n");
            navigate("/signin", {
                replace: true
            });
        }
        handleDataChange(false);
    };

    // Unsolved 파트
    async function handleUnsolvedMovePageLeft() {
        if(pageUnsolved === 20000 || pageUnsolved === 20001 || pageUnsolved === 20004) {
            alert("This is first page!\n");
        }
        else {
            try {
                handleDataChange(true);
                const token = localStorage.getItem("token");
                const response = await axios.get(`/backend/list/unsolved/${indexUnsolved - 10}`,
                {
                    headers: {Authorization: token,},
                });
                if(response.data.status === 401) {
                    localStorage.removeItem("token");
                    alert("You were automatically logged out because you haven't used it for 10 minutes!\nPlease log in again.\n");
                    navigate("/signin", {
                        replace: true
                    });
                }
                else if(response.data.status === 403) {
                    localStorage.removeItem("token");
                    alert("Wrong approach!\nPlease log in again.\n");
                    navigate("/signin", {
                        replace: true
                    });
                }
                else {
                    localStorage.setItem("token", response.data.token);
                    let jsonList = [];
                    for(let i = 0; i < response.data.data.length; i++) {
                        jsonList.push(response.data.data[i]);
                    }
                    setUnsolvedList(jsonList);
                    setPageUnsolved(response.data.status);
                    setIndexUnsolved(indexUnsolved - 10);
                }
            } catch (error) {
                localStorage.removeItem("token");
                alert("Cannot connect with Backend server!\n");
                navigate("/signin", {
                    replace: true
                });
            }
            handleDataChange(false);
        }
    };

    async function handleUnsolvedMovePageRight() {
        if(pageUnsolved === 20000 || pageUnsolved === 20002 || pageUnsolved === 20004) {
            alert("This is last page!\n");
        }
        else {
            try {
                handleDataChange(true);
                const token = localStorage.getItem("token");
                const response = await axios.get(`/backend/list/unsolved/${indexUnsolved + 10}`,
                {
                    headers: {Authorization: token,},
                });
                if(response.data.status === 401) {
                    localStorage.removeItem("token");
                    alert("You were automatically logged out because you haven't used it for 10 minutes!\nPlease log in again.\n");
                    navigate("/signin", {
                        replace: true
                    });
                }
                else if(response.data.status === 403) {
                    localStorage.removeItem("token");
                    alert("Wrong approach!\nPlease log in again.\n");
                    navigate("/signin", {
                        replace: true
                    });
                }
                else {
                    localStorage.setItem("token", response.data.token);
                    let jsonList = [];
                    for(let i = 0; i < response.data.data.length; i++) {
                        jsonList.push(response.data.data[i]);
                    }
                    setUnsolvedList(jsonList);
                    setPageUnsolved(response.data.status);
                    setIndexUnsolved(indexUnsolved + 10);
                }
            } catch (error) {
                localStorage.removeItem("token");
                alert("Cannot connect with Backend server!\n");
                navigate("/signin", {
                    replace: true
                });
            }
            handleDataChange(false);
        }
    };

    // Solved 파트
    async function handleSolvedMovePageLeft() {
        if(pageSolved === 20000 || pageSolved === 20001 || pageSolved === 20004) {
            alert("This is first page!\n");
        }
        else {
            try {
                handleDataChange(true);
                const token = localStorage.getItem("token");
                const response = await axios.get(`/backend/list/solved/${indexSolved - 5}`,
                {
                    headers: {Authorization: token,},
                });
                if(response.data.status === 401) {
                    localStorage.removeItem("token");
                    alert("You were automatically logged out because you haven't used it for 10 minutes!\nPlease log in again.\n");
                    navigate("/signin", {
                        replace: true
                    });
                }
                else if(response.data.status === 403) {
                    localStorage.removeItem("token");
                    alert("Wrong approach!\nPlease log in again.\n");
                    navigate("/signin", {
                        replace: true
                    });
                }
                else {
                    localStorage.setItem("token", response.data.token);
                    let jsonList = [];
                    for(let i = 0; i < response.data.data.length; i++) {
                        jsonList.push(response.data.data[i]);
                    }
                    setSolvedList(jsonList);
                    setPageSolved(response.data.status);
                    setIndexSolved(indexSolved - 5);
                }
            } catch (error) {
                localStorage.removeItem("token");
                alert("Cannot connect with Backend server!\n");
                navigate("/signin", {
                    replace: true
                });
            }
            handleDataChange(false);
        }
    };

    async function handleSolvedMovePageRight() {
        if(pageSolved === 20000 || pageSolved === 20002 || pageSolved === 20004) {
            alert("This is last page!\n");
        }
        else {
            try {
                handleDataChange(true);
                const token = localStorage.getItem("token");
                const response = await axios.get(`/backend/list/solved/${indexSolved + 5}`,
                {
                    headers: {Authorization: token,},
                });
                if(response.data.status === 401) {
                    localStorage.removeItem("token");
                    alert("You were automatically logged out because you haven't used it for 10 minutes!\nPlease log in again.\n");
                    navigate("/signin", {
                        replace: true
                    });
                }
                else if(response.data.status === 403) {
                    localStorage.removeItem("token");
                    alert("Wrong approach!\nPlease log in again.\n");
                    navigate("/signin", {
                        replace: true
                    });
                }
                else {
                    localStorage.setItem("token", response.data.token);
                    let jsonList = [];
                    for(let i = 0; i < response.data.data.length; i++) {
                        jsonList.push(response.data.data[i]);
                    }
                    setSolvedList(jsonList);
                    setPageSolved(response.data.status);
                    setIndexSolved(indexSolved + 5);
                }
            } catch (error) {
                localStorage.removeItem("token");
                alert("Cannot connect with Backend server!\n");
                navigate("/signin", {
                    replace: true
                });
            }
            handleDataChange(false);
        }
    };

    // GPS값을 부모 컴포넌트로 전달
    const handleGPSChange1 = (newData) => {
        handleGPSChange(newData);
    };

    if (loading) return <Loader type="spin" color="#2D9CDB" message="Please wait a moment..." />;

    return (
        <div>
            <button
                id='unsolved_button'
                onClick={handleShowUnsolved} >
                Unsolved Cases
            </button>
            <button
                id='solved_button'
                onClick={handleShowSolved} >
                Solved Cases
            </button>
            {showUnsolved &&
                <div id='unsolved_frame'>
                    {unsolvedList.map((it) => (
                        <UnsolvedList
                            key={it.caseNum}
                            userEmail={userEmail}
                            caseInfo={it}
                            handleDataChange={handleDataChange}
                            handleGPSChange={handleGPSChange1}
                            childUnsolvedMove={childUnsolvedMove} />
                    ))}
                    <button
                        id='unsolved_left'
                        onClick={handleUnsolvedMovePageLeft} >
                        L
                    </button>
                    <button
                        id='unsolved_right'
                        onClick={handleUnsolvedMovePageRight} >
                        R
                    </button>
                </div>
            }
            {showSolved &&
                <div id='solved_frame'>
                    {solvedList.map((it) => (
                        <SolvedList
                            key={it.caseNum}
                            userEmail={userEmail}
                            caseInfo={it}
                            handleDataChange={handleDataChange}
                            handleGPSChange={handleGPSChange1}
                            childSolvedMove={childSolvedMove} />
                    ))}
                    <button
                        id='solved_left'
                        onClick={handleSolvedMovePageLeft} >
                        L
                    </button>
                    <button
                        id='solved_right'
                        onClick={handleSolvedMovePageRight} >
                        R
                    </button>
                </div>
            }
        </div>
    );
}
