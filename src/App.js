import React, { useState } from "react";
import GradeTable from "./components/GradeTable";
import "./App.css";

const App = () => {
    const initialData = [
        ...Array(4).fill(0).map((_, idx) => ({
            id: `1-${idx + 1}`,
            year: 1,
            category: "교양",
            type: "선택",
            subject: "",
            credit: 1,
            attendance: 0,
            assignment: 0,
            midterm: 0,
            final: 0,
            total: 0,
            grade: "",
            selected: false,
        })),
        ...Array(4).fill(0).map((_, idx) => ({
            id: `2-${idx + 1}`,
            year: 2,
            category: "교양",
            type: "선택",
            subject: "",
            credit: 1,
            attendance: 0,
            assignment: 0,
            midterm: 0,
            final: 0,
            total: 0,
            grade: "",
            selected: false,
        })),
        ...Array(4).fill(0).map((_, idx) => ({
            id: `3-${idx + 1}`,
            year: 3,
            category: "교양",
            type: "선택",
            subject: "",
            credit: 1,
            attendance: 0,
            assignment: 0,
            midterm: 0,
            final: 0,
            total: 0,
            grade: "",
            selected: false,
        })),
    ];

    const [grades, setGrades] = useState(initialData);
    const [year, setYear] = useState(1);

    const handleAddRow = () => {
        setGrades([
            ...grades,
            {
                id: `${year}-${Date.now()}`,
                year,
                category: "교양",
                type: "선택",
                subject: "",
                credit: 1,
                attendance: 0,
                assignment: 0,
                midterm: 0,
                final: 0,
                total: 0,
                grade: "",
                selected: false,
            },
        ]);
    };

    const handleDeleteRows = () => {
        setGrades(grades.filter((row) => !row.selected));
    };

    const handleSave = () => {
        const updatedGrades = grades.map((row) => {
            const total =
                Number(row.attendance) +
                Number(row.assignment) +
                Number(row.midterm) +
                Number(row.final);

            let grade = "";
            if (row.credit === 1) {
                // Pass/Non-Pass 과목
                grade = total >= 60 ? "P" : "NP";
            } else {
                // 일반 과목 성적 계산
                if (total >= 95) grade = "A+";
                else if (total >= 90) grade = "A0";
                else if (total >= 85) grade = "B+";
                else if (total >= 80) grade = "B0";
                else if (total >= 75) grade = "C+";
                else if (total >= 70) grade = "C0";
                else if (total >= 65) grade = "D+";
                else if (total >= 60) grade = "D0";
                else grade = "F";
            }

            return { ...row, total, grade };
        });

        setGrades(updatedGrades);
    };

    const handleUpdateRow = (id, field, value) => {
        const updatedGrades = grades.map((row) =>
            row.id === id
                ? { ...row, [field]: field === "credit" && value < 1 ? 1 : value }
                : row
        );
        setGrades(updatedGrades);
    };

    const filteredGrades = grades.filter((row) => row.year === year);

    return (
        <div className="App">
            <h1>Front-end 과제</h1>
            <div className="header">
                <select
                    className="year-select"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                >
                    {[1, 2, 3].map((y) => (
                        <option key={y} value={y}>
                            {y}학년
                        </option>
                    ))}
                </select>
                <div className="controls">
                    <button onClick={handleAddRow}>추가</button>
                    <button onClick={handleDeleteRows}>삭제</button>
                    <button onClick={handleSave}>저장</button>
                </div>
            </div>
            <GradeTable grades={filteredGrades} onUpdateRow={handleUpdateRow} />
        </div>
    );
};

export default App;
