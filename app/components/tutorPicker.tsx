/* This component works with the tutor info page to provide a dropdown selection menu */
import React from "react";

type Tutor = {
    tutorId: number;
    name: string;
    birthday: string;
    subjects: string;
    availability: string;
    isAdmin: boolean;
};

type Props = {
    tutors: Tutor[];
    selected: Tutor | null;
    onSelect: (tutor: Tutor) => void;
};

const TutorDropdown: React.FC<Props> = ({ tutors, selected, onSelect }) => {
    const sorted = [...tutors].sort((a, b) => // sort by name alphabetically
        a.name.localeCompare(b.name)
    );

    return (

        <select
            value={selected?.name || ""}
            onChange={(e) => {
                const tutor = sorted.find(t => t.name === e.target.value);
                if (tutor) onSelect(tutor);
            }}
            style={styles.select}
        >
            <option value="" disabled>
                Select a tutor
            </option>

            {sorted.map((t) => (
                <option key={t.tutorId} value={t.name}>
                    {t.name}
                </option>
            ))}
        </select>
    );
};

const styles = {
    select: {
        padding: "10px 15px",
        fontSize: "16px",
        borderRadius: "8px",
        width: "100%",
        border: "2px solid secondary.dark",
        backgroundColor: "#f5f5f5",
        cursor: "pointer",
        outline: "none",
        transition: "border-color 0.3s",
        marginBottom: "20px",
        boxShadow: '5'
    },
};

export default TutorDropdown;


