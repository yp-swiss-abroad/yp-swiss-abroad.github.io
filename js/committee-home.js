(function() {
    if (!Array.isArray(YPSA_COMMITTEE_MEMBERS)) {
        return;
    }

    const hasRealText = (value) => {
        if (!value) {
            return false;
        }
        return !String(value).trim().toLowerCase().includes("tbc");
    };

    const list = document.getElementById("home-committee-list");
    if (!list) {
        return;
    }

    const getLastName = (fullName) => {
        if (!fullName) return "";
        const parts = fullName.trim().split(/\s+/);
        return parts[parts.length - 1];
    };

    const members = YPSA_COMMITTEE_MEMBERS.filter((member) => {
        return hasRealText(member.name) && hasRealText(member.affiliation);
    }).sort((a, b) => {
        const lastNameA = getLastName(a.name).toLowerCase();
        const lastNameB = getLastName(b.name).toLowerCase();
        return lastNameA.localeCompare(lastNameB);
    });

    list.innerHTML = members
        .map((member) => {
            const role = member.role ? member.role : "Committee Member";
            const photo = member.photo ? member.photo : "images/committee-placeholder.svg";
            return (
                "<article class=\"committee-list-item\">" +
                    "<div class=\"committee-list-avatar\">" +
                        "<img src=\"" + photo + "\" alt=\"" + member.name + "\">" +
                    "</div>" +
                    "<div class=\"committee-list-body\">" +
                        "<div class=\"committee-list-name\">" + member.name + "</div>" +
                        "<div class=\"committee-list-affiliation\">" + member.affiliation + "</div>" +
                        "<div class=\"committee-list-role\">" + role + "</div>" +
                    "</div>" +
                "</article>"
            );
        })
        .join("");
})();
