"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../lib/AuthContext";
import AdminLayout from "./AdminLayout";
import acc from "../backend/users";
import db from "../backend/databases";

export default function AdminSettings() {
  const { user } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Interest fields CRUD states
  const [interestFields, setInterestFields] = useState<
    Array<{ $id: string; field: string; visible: boolean }>
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingField, setEditingField] = useState<{
    $id: string;
    field: string;
    visible: boolean;
  } | null>(null);
  const [newFieldName, setNewFieldName] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  // Password change states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Fetch interest fields
  const fetchInterestFields = async () => {
    try {
      setIsLoading(true);
      const response = await db.intrestFields.list();
      setInterestFields(response.documents);
    } catch (err: any) {
      setError("Failed to fetch interest fields: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Add new interest field
  const handleAddField = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFieldName.trim()) return;

    setIsUpdating(true);
    setMessage("");
    setError("");

    try {
      await db.intrestFields.create({
        field: newFieldName.trim(),
        visible: true,
      });
      setMessage("Interest field added successfully!");
      setNewFieldName("");
      setIsAdding(false);
      await fetchInterestFields();
    } catch (err: any) {
      setError("Failed to add interest field: " + err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  // Update interest field
  const handleUpdateField = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingField) return;

    setIsUpdating(true);
    setMessage("");
    setError("");

    try {
      await db.intrestFields.update(editingField.$id, {
        field: editingField.field,
        visible: editingField.visible,
      });
      setMessage("Interest field updated successfully!");
      setEditingField(null);
      await fetchInterestFields();
    } catch (err: any) {
      setError("Failed to update interest field: " + err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  // Delete interest field
  const handleDeleteField = async (fieldId: string) => {
    if (!confirm("Are you sure you want to delete this interest field?"))
      return;

    setIsUpdating(true);
    setMessage("");
    setError("");

    try {
      await db.intrestFields.delete(fieldId);
      setMessage("Interest field deleted successfully!");
      await fetchInterestFields();
    } catch (err: any) {
      setError("Failed to delete interest field: " + err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  // Toggle field visibility
  const handleToggleVisibility = async (field: {
    $id: string;
    field: string;
    visible: boolean;
  }) => {
    setIsUpdating(true);
    setMessage("");
    setError("");

    try {
      await db.intrestFields.update(field.$id, {
        field: field.field,
        visible: !field.visible,
      });
      setMessage(
        `Field ${!field.visible ? "enabled" : "disabled"} successfully!`
      );
      await fetchInterestFields();
    } catch (err: any) {
      setError("Failed to update field visibility: " + err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    fetchInterestFields();
  }, []);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setIsUpdating(true);
    setMessage("");
    setError("");

    try {
      await acc.updatePassword(newPassword, currentPassword);
      setMessage("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setError("Failed to update password: " + err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Settings
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Success/Error Messages */}
        {message && (
          <div className="mb-6 bg-green-50 dark:bg-green-900/50 border border-green-200 dark:border-green-800 rounded-md p-4">
            <p className="text-green-800 dark:text-green-200">{message}</p>
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-md p-4">
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        <div className="space-y-8">
          {/* Interest Fields Management */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                    Interest Fields Management
                  </h2>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Manage target job categories for applications
                  </p>
                </div>
                <button
                  onClick={() => setIsAdding(true)}
                  disabled={isUpdating || isAdding}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Add New Field
                </button>
              </div>
            </div>

            <div className="px-6 py-4">
              {/* Add New Field Form */}
              {isAdding && (
                <form
                  onSubmit={handleAddField}
                  className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex gap-4 items-end">
                    <div className="flex-1">
                      <label
                        htmlFor="newField"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Field Name
                      </label>
                      <input
                        type="text"
                        id="newField"
                        value={newFieldName}
                        onChange={(e) => setNewFieldName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                        placeholder="e.g., Software Engineer"
                        disabled={isUpdating}
                        required
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        disabled={isUpdating || !newFieldName.trim()}
                        className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {isUpdating ? "Adding..." : "Add"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAdding(false);
                          setNewFieldName("");
                        }}
                        disabled={isUpdating}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* Interest Fields List */}
              {isLoading ? (
                <div className="text-center py-4">
                  <p className="text-gray-500 dark:text-gray-400">
                    Loading interest fields...
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {interestFields.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                      No interest fields found. Add your first field above.
                    </p>
                  ) : (
                    interestFields.map((field) => (
                      <div
                        key={field.$id}
                        className="flex items-center justify-between p-4 bg-gray-200 dark:bg-gray-700 rounded-lg"
                      >
                        {editingField && editingField.$id === field.$id ? (
                          // Edit mode
                          <form
                            onSubmit={handleUpdateField}
                            className="flex-1 flex items-center gap-4"
                          >
                            <input
                              type="text"
                              value={editingField.field}
                              onChange={(e) =>
                                setEditingField({
                                  ...editingField,
                                  field: e.target.value,
                                })
                              }
                              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                              disabled={isUpdating}
                              required
                            />
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                checked={editingField.visible}
                                onChange={(e) =>
                                  setEditingField({
                                    ...editingField,
                                    visible: e.target.checked,
                                  })
                                }
                                className="mr-2"
                                disabled={isUpdating}
                              />
                              <span className="text-sm text-gray-700 dark:text-gray-300">
                                Visible
                              </span>
                            </label>
                            <div className="flex gap-2">
                              <button
                                type="submit"
                                disabled={isUpdating}
                                className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                              >
                                Save
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingField(null)}
                                disabled={isUpdating}
                                className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50"
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        ) : (
                          // View mode
                          <>
                            <div className="flex-1">
                              <span className="font-medium text-gray-900 dark:text-white">
                                {field.field}
                              </span>
                              <span
                                className={`ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  field.visible
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                }`}
                              >
                                {field.visible ? "Visible" : "Hidden"}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleToggleVisibility(field)}
                                disabled={isUpdating}
                                className={`px-3 py-1 text-sm rounded transition-colors disabled:opacity-50 ${
                                  field.visible
                                    ? "bg-yellow-600 text-white hover:bg-yellow-700"
                                    : "bg-green-600 text-white hover:bg-green-700"
                                }`}
                              >
                                {field.visible ? "Hide" : "Show"}
                              </button>
                              <button
                                onClick={() => setEditingField(field)}
                                disabled={isUpdating}
                                className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteField(field.$id)}
                                disabled={isUpdating}
                                className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                              >
                                Delete
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Change Password */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Change Password
              </h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Update your password to keep your account secure
              </p>
            </div>

            <form
              onSubmit={handlePasswordChange}
              className="px-6 py-4 space-y-4"
            >
              <div>
                <label
                  htmlFor="current-password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Current Password
                </label>
                <input
                  type="password"
                  id="current-password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  disabled={isUpdating}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="new-password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  disabled={isUpdating}
                  required
                  minLength={8}
                />
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  disabled={isUpdating}
                  required
                  minLength={8}
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isUpdating ? "Updating..." : "Change Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
