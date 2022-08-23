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

export const hashtagValidation = (hashtagInput) => {
    if(!hashtagInput) return false;
    return true;
}

export const userTypeTrans = (userType) => {
    if(userType === "SEEKER") return "취준생";
    else if(userType === "JUNIOR") return "주니어";
    else if(userType === "SENIOR") return "시니어";
}