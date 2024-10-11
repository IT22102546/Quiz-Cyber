import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Modal } from 'flowbite-react';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function DashQuiz() {
  const { currentUser } = useSelector((state) => state.user);
  const [quizzes, setQuizzes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [quizIdToDelete, setQuizIdToDelete] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await fetch(`/api/quize/get-quizzes?searchTerm=${searchTerm}`);
        const data = await res.json();
        if (res.ok) {
          setQuizzes(data.quizzes);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchQuizzes();
  }, [searchTerm]);

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

  const handleEditQuiz = (quiz) => {
    navigate(`/edit-quiz/${quiz._id}`, { state: { quiz } });
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
      </div>

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
