import React, { useState, useEffect } from 'react';
import Header from "./partials/AdminHeader";
import Left from "./partials/Left";

function SubCategoryDash() {
    // State hooks for managing categories and form visibility
    const [Subcategories, setSubCategories] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [nameError, setNameError] = useState('');
    const [newSubCategory, setNewSubCategory] = useState({
        name: '',
    });
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [isEditing, setIsEditing] = useState();

    const validateForm = () => {
        let valid = true;
        if (!newSubCategory.name.trim()) {
            setNameError('Please enter your name');
            valid = false;
        } else {
            setNameError('');
        }
        return valid;
    };


    const handleInputChange = (e) => {
        console.log("okk");
        const { name, value } = e.target;

        setNewSubCategory((prevSubCategory) => ({
            ...prevSubCategory,
            [name]: value,
        }));
    };

    const handleAddSubCategory = async (e) => {
        console.log("okkkkkkk");
        e.preventDefault();
        console.log('Adding/Editing Subcategory...');

        if (!validateForm()) {
            return;
        }
        try {
            const url = selectedSubCategory ? `/api/subcategories/${selectedSubCategory._id}` : '/api/subcategories';
            const method = selectedSubCategory ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newSubCategory),
            });

            if (response.ok) {
                const updatedSubCategory = await response.json();

                if (selectedSubCategory) {
                    // Replace the existing subcategory with the updated details
                    setSubCategories(Subcategories.map(Subcategory =>
                        Subcategory._id === updatedSubCategory._id ? updatedSubCategory : Subcategory
                    ));
                } else {
                    // Add the new subcategory to the list
                    setSubCategories([...Subcategories, updatedSubCategory]);
                }

                // Reset form and selected subcategory
                setNewSubCategory({ name: '' });
                setSelectedSubCategory(null);

                setShowForm(false);
            } else {
                const errorMessage = await response.text();
                console.error('Error adding/editing Subcategory:', errorMessage);
            }
        } catch (error) {
            console.error('Error adding/editing Subcategory', error);
        }

    };

    const fetchSubCategories = async () => {
        try {
            const response = await fetch('/api/subcategories');
            if (response.ok) {
                const data = await response.json();
                setSubCategories(data);
            } else {
                console.error('Error fetching Subcategories');
            }
        } catch (error) {
            console.error('Error fetching Subcategories', error);
        }
    };

    const handleEditClick = (Subcategory) => {
        setSelectedSubCategory(Subcategory);
        setNewSubCategory({
            name: Subcategory.name,
        });
        setIsEditing(true);
        setShowForm(true);
    };

    const handleDeleteClick = async (SubcategoryId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this Subcategory?");
        if (confirmDelete) {
            try {
                const response = await fetch(`/api/subcategories/${SubcategoryId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setSubCategories(Subcategories.filter(Subcategory => Subcategory._id !== SubcategoryId));
                } else {
                    const errorMessage = await response.text();
                    console.error('Error deleting Subcategory:', errorMessage);
                }
            } catch (error) {
                console.error('Error deleting Subcategory', error);
            }
        }
    };

    useEffect(() => {
        fetchSubCategories();
    }, []);

    return (
        <>
            <Header />
            <section className="dash">
                <div className="container">
                    <div className="row">
                        <Left />
                        <div className="col-md-8">
                            <h1>Subcategory Dashboard</h1>
                            <div>
                                <button onClick={() => setShowForm(!showForm)} className="btn btn-success form-control my-3">
                                    {showForm ? 'Hide Form' : 'Add SubCategory'}
                                </button>
                                {showForm && (
                                    <div className="card">
                                        <div className="card-header">
                                            <h2>Add SubCategory</h2>
                                        </div>
                                        <div className="card-body">
                                            <form onSubmit={handleAddSubCategory}>
                                                <div className="form-group">
                                                    <label>name:</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={newSubCategory.name}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                    />
                                                    {nameError && <div className="text-danger">{nameError}</div>}
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary mt-2 form-control"
                                                >
                                                    {isEditing ? 'Update SubCategory' : 'Add SubCategory'}
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {!showForm && (
                                <div>
                                    <h2>SubCategory List</h2>
                                    <table className='table table-dark table-hover'>
                                        <thead>
                                            <tr>
                                                <th>name</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Subcategories.length > 0 ? (
                                                Subcategories.map((Subcategory) => (
                                                    <tr key={Subcategory._id}>
                                                        <td>{Subcategory.name}</td>
                                                        <td>
                                                            <button className='btn btn-success me-2' onClick={() => handleEditClick(Subcategory)}>Edit</button>
                                                            <button className='btn btn-danger' onClick={() => handleDeleteClick(Subcategory._id)}>Delete</button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="2">No Subcategories found</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default SubCategoryDash;