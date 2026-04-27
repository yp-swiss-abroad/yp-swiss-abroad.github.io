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

    const isMemberComplete = (member) => {
        const hasPhoto = Boolean(member.photo) && !member.photo.includes("committee-placeholder");
        return (
            hasRealText(member.name) &&
            hasRealText(member.affiliation) &&
            hasRealText(member.bio) &&
            hasPhoto
        );
    };

    const getLastName = (fullName) => {
        if (!fullName) return "";
        const parts = fullName.trim().split(/\s+/);
        return parts[parts.length - 1];
    };

    const renderCommitteeMembers = () => {
        const grid = document.getElementById("committee-grid");
        if (!grid) {
            return;
        }

        grid.innerHTML = "";

        const sortedMembers = YPSA_COMMITTEE_MEMBERS
            .filter(isMemberComplete)
            .sort((a, b) => {
                const lastNameA = getLastName(a.name).toLowerCase();
                const lastNameB = getLastName(b.name).toLowerCase();
                return lastNameA.localeCompare(lastNameB);
            });

        sortedMembers.forEach((member) => {
            const card = document.createElement("article");
            card.className = "committee-card";
            card.id = member.id;

            const socials = [];
            if (member.links && member.links.x) {
                socials.push({
                    href: member.links.x,
                    label: "X",
                    icon: "icon-x"
                });
            }
            if (member.links && member.links.linkedin) {
                socials.push({
                    href: member.links.linkedin,
                    label: "LinkedIn",
                    icon: "icon-linkedin"
                });
            }
            if (member.links && member.links.website) {
                socials.push({
                    href: member.links.website,
                    label: "Website",
                    icon: "icon-website"
                });
            }
            if (member.links && member.links.googleScholar) {
                socials.push({
                    href: member.links.googleScholar,
                    label: "Google Scholar",
                    icon: "icon-scholar"
                });
            }

            const socialsMarkup = socials.length
                ? `<div class="committee-socials">${socials
                      .map(
                          (link) =>
                              `<a class="social-link" href="${link.href}" target="_blank" rel="noopener" aria-label="${link.label}">
                                  <svg role="img" aria-hidden="true"><use href="#${link.icon}"></use></svg>
                              </a>`
                      )
                      .join("")}</div>`
                : "";

            const roleMarkup = member.role
                ? `<div class="committee-title">${member.role}</div>`
                : "";

            const affiliationMarkup = member.affiliation
                ? `<div class="committee-affiliation">${member.affiliation}</div>`
                : "";

            card.innerHTML = `
                <div class="committee-photo">
                    <img src="${member.photo}" alt="${member.name}">
                </div>
                <div class="committee-content">
                    <div class="committee-name">${member.name}</div>
                    ${roleMarkup}
                    ${affiliationMarkup}
                    <p class="committee-bio">${member.bio}</p>
                    ${socialsMarkup}
                </div>
            `;

            grid.appendChild(card);
        });
    };

    document.addEventListener("DOMContentLoaded", () => {
        renderCommitteeMembers();
    });
})();
