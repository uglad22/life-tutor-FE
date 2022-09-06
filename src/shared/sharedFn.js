import moment from "moment"

export const editPostingTime = (timeValue) => {
    const diffSeconds = moment().diff(moment(timeValue), "seconds");
    if(diffSeconds <= 60) return `방금 전`;
    else if(diffSeconds > 60 && diffSeconds < (60 * 60)) {
        let diffMin = moment().diff(moment(timeValue), "minutes");
        return `${diffMin}분 전`;
    }
    else if(diffSeconds >= (60 * 60) && diffSeconds < (60 * 60 * 24)) {
        let diffHour = moment().diff(moment(timeValue), "hours");
        return `${diffHour}시간 전`;
    }
    else if(diffSeconds >= (60 * 60 * 24)) {
        let diffMonth = moment().diff(moment(timeValue), "month");
        if(diffMonth) {
            if(diffMonth < 12) return `${diffMonth}달 전`;
            else {
                let diffYear = moment().diff(moment(timeValue), "year");
                return `${diffYear}년 전`;
            }
        } 
        else if(!diffMonth) {
            let diffDay = moment().diff(moment(timeValue), "day");
            return `${diffDay}일 전`;
        }
    }
}

// export const hashtagValidation = (hashtagInput) => {
//     if(!hashtagInput) return false;
//     return true;
// }

export const hashtagValidation = (hashtagInput, hashtagArray) => {
    if(!hashtagInput) {
        alert("특수문자, 공백은 사용할 수 없습니다!");
        return false;
    }
    else if(hashtagInput.length === 1 || hashtagInput.length > 6) {
        alert("해시태그는 2~6자리까지 등록 할 수 있습니다.(특수문자, 공백 사용불가)");
        return false;
    }
    else if(hashtagArray.length === 3) {
        alert("해시태그는 3개까지 등록 할 수 있습니다.");
        return false;
    }
    return true;
}

export const userTypeTrans = (userType) => {
    if(userType === "SEEKER") return "취준생";
    else if(userType === "JUNIOR") return "주니어";
    else if(userType === "SENIOR") return "시니어";
}