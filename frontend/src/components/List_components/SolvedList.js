import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function SolvedList({ userEmail, caseInfo, handleDataChange, handleGPSChange, childSolvedMove }) {

    const navigate = useNavigate();

    function handleAboutCase() {
        alert(`\nCase Number : ${caseInfo.caseNum}\nDetected Time : ${caseInfo.detectedTime}\nSolved Time : ${caseInfo.solvedTime}\n\n<About the person in charge>\nName : ${caseInfo.name}\nEmail : ${caseInfo.email}\nPhone Number : ${caseInfo.tel}\n`);
    }

    function handleLoadGoogleMap(e) {
        e.stopPropagation();
        const gps = caseInfo.latitude + ' ' + caseInfo.longitude;
        handleGPSChange(gps);
    }

    function handleLoadImage(e) {
        e.stopPropagation();
        window.open(`http://localhost:28080/${caseInfo.pic}`);
    }

    async function handleSolvedMoveCase(e) {
        e.stopPropagation();
        if(userEmail !== caseInfo.email) {
            alert("You don't have the authority.\n");
        }
        else {
            try {
                handleDataChange(true);
                const token = localStorage.getItem("token");
                const response = await axios.put("/backend/list/solved", {
                    caseNum: caseInfo.caseNum
                },
                {
                    headers: {Authorization: token,},
                });
                if(response.data.status === 200) {
                    localStorage.setItem("token", response.data.token);
                    alert("Successfully worked!\nRefresh the page.\n");
                    childSolvedMove();
                }
                else if(response.data.status === 40000) {
                    localStorage.setItem("token", response.data.token);
                    alert("Invalid case number!\nRefresh the page.\n");
                    childSolvedMove();
                }
                else if(response.data.status === 401) {
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
                    localStorage.removeItem("token");
                    alert("Backend Server Error!\nPlease log in again.\n");
                    navigate("/signin", {
                        replace: true
                    });
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
    }

    async function handleRemoveFromList(e) {
        e.stopPropagation();
        if(userEmail !== caseInfo.email) {
            alert("You don't have the authority.\n");
        }
        else {
            try {
                handleDataChange(true);
                const token = localStorage.getItem("token");
                const response = await axios.delete("/backend/list/solved", {
                    data: {
                        caseNum: caseInfo.caseNum
                    },
                    headers: {Authorization: token,},
                });
                if(response.data.status === 200) {
                    localStorage.setItem("token", response.data.token);
                    alert("Successfully worked!\nRefresh the page.\n");
                    childSolvedMove();
                }
                else if(response.data.status === 400) {
                    localStorage.setItem("token", response.data.token);
                    alert("Invalid case number!\nRefresh the page.\n");
                    childSolvedMove();
                }
                else if(response.data.status === 401) {
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
                    alert("Already removed case!\nRefresh the page.\n");
                    childSolvedMove();
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
    }

    // 마우스 오버, 아웃 이벤트

    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };

    return (
        <div
            id={isHovering ? "changeSolvedColor" : ""}
            className='solvedlistRec'
            onClick={handleAboutCase}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut} >
            <div className='cnlabel_s'>
                CaseNumber :
            </div>
            <div className='cnvalue_s'>
                {caseInfo.caseNum}
            </div>
            <div className='gpslabel_s'>
                GPS :
            </div>
            <div
                className='gpsvalue_s'
                onClick={handleLoadGoogleMap} >
                {caseInfo.latitude}  /  {caseInfo.longitude}
            </div>
            <div
                className='imagebutton_s'
                onClick={handleLoadImage} >
                Image
            </div>
            <div
                className='sendto_solved_s'
                onClick={handleSolvedMoveCase} >
                Unsolved!
            </div>
            <div className='cwline'/>
            <div className='personlabel_s'>
                The person in charge :
            </div>
            <div className='personvalue_s'>
                {caseInfo.name}
            </div>
            <div
                className='removebutton_s'
                onClick={handleRemoveFromList} >
                Remove from list
            </div>
        </div>
    );
}
