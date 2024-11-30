import React from "react";
import GradeRow from "./GradeRow";

const GradeTable = ({ grades, onUpdateRow }) => {
    // 합계 계산
    const totalCredits = grades.reduce((sum, row) => sum + (row.credit > 1 ? row.credit : 0), 0);
    const totalAttendance = grades.reduce((sum, row) => sum + Number(row.attendance), 0);
    const totalAssignment = grades.reduce((sum, row) => sum + Number(row.assignment), 0);
    const totalMidterm = grades.reduce((sum, row) => sum + Number(row.midterm), 0);
    const totalFinal = grades.reduce((sum, row) => sum + Number(row.final), 0);
    const totalScore = grades.reduce((sum, row) => sum + (row.credit > 1 ? Number(row.total) : 0), 0);

    // 평균 점수 계산 (P/NP 과목 제외)
    const validGrades = grades.filter(row => row.credit > 1);
    const average = validGrades.length > 0 ? (totalScore / validGrades.length).toFixed(2) : 0;

    // 합계 성적 계산
    const calculateOverallGrade = (avg) => {
        if (avg >= 95) return "A+";
        if (avg >= 90) return "A0";
        if (avg >= 85) return "B+";
        if (avg >= 80) return "B0";
        if (avg >= 75) return "C+";
        if (avg >= 70) return "C0";
        if (avg >= 65) return "D+";
        if (avg >= 60) return "D0";
        return "F";
    };

    const overallGrade = calculateOverallGrade(average);

    return (
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>이수</th>
                    <th>필수</th>
                    <th>과목명</th>
                    <th>학점</th>
                    <th>출석점수</th>
                    <th>과제점수</th>
                    <th>중간고사</th>
                    <th>기말고사</th>
                    <th>총점</th>
                    <th>평균</th>
                    <th>성적</th>
                </tr>
            </thead>
            <tbody>
                {grades.map((row) => (
                    <GradeRow key={row.id} row={row} onUpdateRow={onUpdateRow} />
                ))}
                <tr>
                    <td colSpan="4">합계</td>
                    <td>{totalCredits}</td>
                    <td>{totalAttendance}</td>
                    <td>{totalAssignment}</td>
                    <td>{totalMidterm}</td>
                    <td>{totalFinal}</td>
                    <td>{totalScore}</td>
                    <td>{average}</td>
                    <td style={{ color: overallGrade === "F" ? "red" : "black" }}>{overallGrade}</td>
                </tr>
            </tbody>
        </table>
    );
};

export default GradeTable;
