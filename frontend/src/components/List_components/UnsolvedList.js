import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function UnsolvedList({ userEmail, caseInfo, handleDataChange, handleGPSChange, childUnsolvedMove }) {

    const navigate = useNavigate();

    function handleAboutCase() {
        alert(`\nCase Number : ${caseInfo.caseNum}\nDetected Time : ${caseInfo.detectedTime}\n`);
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
    
    async function handleUnsolvedMoveCase(e) {
        e.stopPropagation();
        try {
            handleDataChange(true);
            const token = localStorage.getItem("token");
            const response = await axios.put("/backend/list/unsolved", {
                caseNum: caseInfo.caseNum
            },
            {
                headers: {Authorization: token,},
            });
            if(response.data.status === 200) {
                localStorage.setItem("token", response.data.token);
                alert("Successfully worked!\nRefresh the page.\n");
                childUnsolvedMove();
            }
            else if(response.data.status === 40000) {
                localStorage.setItem("token", response.data.token);
                alert("Invalid user access!\nRefresh the page.\n");
                childUnsolvedMove();
            }
            else if(response.data.status === 40001) {
                localStorage.setItem("token", response.data.token);
                alert("Invalid case number!\nRefresh the page.\n");
                childUnsolvedMove();
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
            id={isHovering ? "changeUnsolvedColor" : ""}
            className='unsolvedlistRec'
            onClick={handleAboutCase}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut} >
            <div className='cnlabel'>
                CaseNumber :
            </div>
            <div className='cnvalue'>
                {caseInfo.caseNum}
            </div>
            <div className='gpslabel'>
                GPS :
            </div>
            <div
                className='gpsvalue'
                onClick={handleLoadGoogleMap} >
                {caseInfo.latitude}  /  {caseInfo.longitude}
            </div>
            <div
                className='imagebutton'
                onClick={handleLoadImage} >
                Image
            </div>
            <div
                className='sendto_solved'
                onClick={handleUnsolvedMoveCase} >
                Solved!
            </div>
        </div>
    );
}
