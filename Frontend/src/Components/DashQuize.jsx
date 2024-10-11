import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; // Import useSelector
import { useNavigate } from 'react-router-dom';
import { Table, Button, Modal } from 'flowbite-react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import html2pdf from 'html2pdf.js'; // Make sure to import this if it's being used

export default function DashQuiz() {
  const { currentUser } = useSelector((state) => state.user);
  const [quizzes, setQuizzes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [quizIdToDelete, setQuizIdToDelete] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState(''); // State for selected category
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await fetch(`/api/quize/get-quizzes?searchTerm=${searchTerm}&category=${category}`);
        const data = await res.json();
        if (res.ok) {
          setQuizzes(data.quizzes);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchQuizzes();
  }, [searchTerm, category]);

  const handleDeleteQuiz = async () => {
    try {
      const res = await fetch(`/api/quize/delete/${quizIdToDelete}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setQuizzes((prev) => prev.filter((quiz) => quiz._id !== quizIdToDelete));
        setShowModal(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value); // Update category state when dropdown changes
  };

  const handleEditQuiz = (quiz) => {
    navigate(`/edit-quiz/${quiz._id}`, { state: { quiz } });
  };

  const generateReport = () => {
    const content = `
      <style>
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          padding: 8px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        th {
          background-color: #f2f2f2;
          font-size: 14px; 
        }
        td {
          font-size: 12px; 
        }
      </style>
      <h1><b>Quizzes Report</b></h1>
      <br>
      <table>
        <thead>
          <tr>
            <th>Date Created</th>
            <th>Question</th>
            <th>Answers</th>
            <th>Correct Answer</th>
          </tr>
        </thead>
        <tbody>
          ${quizzes.map((quiz) => `
            <tr>
              <td>${new Date(quiz.createdAt).toLocaleDateString()}</td>
              <td>${quiz.question}</td>
              <td>
                <ul style="list-style-type: none; padding: 0;">
                  ${quiz.answers.map(answer => `<li>${answer}</li>`).join('')}
                </ul>
              </td>
              <td>${quiz.answers[quiz.correctAnswerIndex]}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    html2pdf().from(content).set({ margin: 1, filename: 'quizzes_report.pdf' }).save();
  };

  return (
    <div className="p-3 md:mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <input
          type="text"
          placeholder="Search Quizzes..."
          value={searchTerm}
          onChange={handleSearch}
          className="px-3 py-2 w-150 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mr-2 h-10 placeholder-gray-500"
        />
        <select
          value={category}
          onChange={handleCategoryChange}
          className="px-3 py-2 w-48 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="">All Categories</option>
          <option value="Main">Main</option>
          <option value="Secondary">Secondary</option>
          <option value="Third">Third</option>
        </select>
      </div>

      {/* Generate Report Button */}
      <Button 
        onClick={generateReport} 
        className="mb-4 bg-blue-600 text-white hover:bg-blue-700 rounded-md px-4 py-2"
      >
        Generate Report
      </Button>

      <div className="table-auto overflow-x-scroll mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
        {quizzes.length > 0 ? (
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date Created</Table.HeadCell>
              <Table.HeadCell>Question</Table.HeadCell>
              <Table.HeadCell>Answers</Table.HeadCell>
              <Table.HeadCell>Correct Answer</Table.HeadCell>
              <Table.HeadCell>Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {quizzes.map((quiz) => (
                <Table.Row key={quiz._id}>
                  <Table.Cell>{new Date(quiz.createdAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>{quiz.question}</Table.Cell>
                  <Table.Cell>
                    <ul className="list-disc list-inside">
                      {quiz.answers.map((answer, index) => (
                        <li key={index}>{answer}</li>
                      ))}
                    </ul>
                  </Table.Cell>
                  <Table.Cell>{quiz.answers[quiz.correctAnswerIndex]}</Table.Cell>
                  <Table.Cell className="flex space-x-2">
                    <Button onClick={() => handleEditQuiz(quiz)}>
                      <FaEdit className="text-blue-600" />
                    </Button>
                    <Button
                      onClick={() => {
                        setQuizIdToDelete(quiz._id);
                        setShowModal(true);
                      }}
                      className="text-red-600"
                    >
                      <FaTrash />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : (
          <p>No quizzes found</p>
        )}
      </div>

      <Modal show={showModal} size="md" onClose={() => setShowModal(false)}>
        <Modal.Header>Confirm Deletion</Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this quiz? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button color="red" onClick={handleDeleteQuiz}>
            Yes, Delete
          </Button>
          <Button color="gray" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
