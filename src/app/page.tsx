"use client";

import React, { useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Trophy, FileText, CheckCircle, ArrowRight } from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fragment } from "react";
import ComparisonGraph from "@/components/comparisongraph";
import Image from "next/image";
import { formSchema, FormSchema } from "@/lib/formvalidation";

const SkillTestDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [skillData, setSkillData] = useState({
    title: "Hyper Text Markup Language",
    date: "5 June 2021",
    duration: "15 mins",
    questions: 15,
    stats: {
      rank: 1,
      percentile: 30,
      correctAnswers: 10,
    },
    topics: [
      { name: "HTML Tools, Forms, History", score: 80 },
      { name: "Tags & References in HTML", score: 60 },
      { name: "Tables & References in HTML", score: 24 },
      { name: "Tables & CSS Basics", score: 96 },
    ],
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rank: skillData.stats.rank,
      percentile: skillData.stats.percentile,
      score: skillData.stats.correctAnswers,
    },
  });

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const onSubmit = (data: FormSchema) => {
    setSkillData((prevData) => ({
      ...prevData,
      stats: {
        ...prevData.stats,
        rank: data.rank,
        percentile: data.percentile,
        correctAnswers: data.score,
      },
    }));
    console.log("Updated Data:", data);
    closeModal();
  };

  const COLORS = ["#4F46E5", "#E6E6E6"];
  const questionAnalysisData = [
    { name: "Correct", value: skillData.stats.correctAnswers },
    {
      name: "Incorrect",
      value: skillData.questions - skillData.stats.correctAnswers,
    },
  ];

  return (
    <div className="min-h-screen pt-10 px-8 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <h1 className="text-l text-gray-800 mb-4">Skill Test</h1>

        {/* Main Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Left Column (spans 2 columns on large screens) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Header Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center space-x-4">
                  <div className="p-2 rounded relative lg:h-14 h-10 aspect-square">
                    <Image
                      src="/html.png"
                      alt="html"
                      fill
                      className="absolute"
                    />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold">{skillData.title}</h2>
                    <p className="text-xs text-gray-500">
                      Questions: {skillData.questions} | Duration:{" "}
                      {skillData.duration} | Submitted on {skillData.date}
                    </p>
                  </div>
                </div>
                <button
                  onClick={openModal}
                  className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors"
                >
                  Update
                </button>
              </div>
            </div>

            {/* Quick Statistics */}
            <div className="rounded-lg shadow">
              <h2 className="text-md font-semibold px-3 pt-2">
                Quick Statistics
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3">
                <div className="bg-white shadow px-3 py-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
                      <Trophy className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div>
                      <p className="text-lg font-bold">
                        {skillData.stats.rank}
                      </p>
                      <p className="text-xs text-gray-500">YOUR RANK</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white shadow px-3 py-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-lg font-bold">
                        {skillData.stats.percentile}%
                      </p>
                      <p className="text-xs text-gray-500">PERCENTILE</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white shadow px-3 py-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
                      <CheckCircle className="h-5 w-4 text-green-500" />
                    </div>
                    <div className="p-0">
                      <p className="text-lg font-bold">
                        {skillData.stats.correctAnswers} / {skillData.questions}
                      </p>
                      <p className="text-xs text-gray-500">CORRECT ANSWERS</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ComparisonGraph percentile={skillData.stats.percentile} />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-4">
            {/* Syllabus Analysis */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-6">
                Syllabus Wise Analysis
              </h2>
              <div className="space-y-6">
                {skillData.topics.map((topic, index) => (
                  <div key={index} className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{topic.name}</span>
                      <span
                        className="text-sm "
                        style={{
                          color:
                            index === 0
                              ? "#4F46E5"
                              : index === 1
                              ? "#F97316"
                              : index === 2
                              ? "#EF4444"
                              : "#22C55E",
                        }}
                      >
                        {topic.score}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${topic.score}%`,
                          backgroundColor:
                            index === 0
                              ? "#4F46E5"
                              : index === 1
                              ? "#F97316"
                              : index === 2
                              ? "#EF4444"
                              : "#22C55E",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Question Analysis */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Question Analysis</h2>
                <span className="text-blue-600 font-semibold">
                  {skillData.stats.correctAnswers}/{skillData.questions}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-6">
                You scored {skillData.stats.correctAnswers} questions correct
                out of {skillData.questions}. However it still needs some
                improvements
              </p>
              <div className="h-64 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={questionAnalysisData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      startAngle={90}
                      endAngle={-270}
                      dataKey="value"
                    >
                      {questionAnalysisData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    <h1 className="flex text-3xl h-full justify-center items-center">
                      🎯
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-35" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex w-full justify-between items-center">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-black"
                    >
                      Update Scores
                    </Dialog.Title>
                    <div className="relative h-12 aspect-square">
                      <Image
                        src="/html.png"
                        alt="html"
                        fill
                        className="absolute"
                      />
                    </div>
                  </div>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6 mt-4"
                  >
                    {/* Rank Field */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium min-w-6 min-h-6 rounded-full flex items-center justify-center text-white bg-blue-900">
                          1
                        </span>
                        <label className="text-sm font-medium text-black">
                          Update your Rank
                        </label>
                      </div>
                      <div className="w-1/3 relative">
                        <div
                          className={`transition-all duration-300 ${
                            errors.rank
                              ? "-translate-x-4 -translate-y-2 border-red-500"
                              : ""
                          }`}
                        >
                          <Controller
                            name="rank"
                            control={control}
                            render={({ field }) => (
                              <input
                                type="number"
                                {...field}
                                className={`w-full p-2 border ${
                                  errors.rank
                                    ? "border-red-500"
                                    : "border-gray-300"
                                } rounded-md transition-colors duration-300`}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                            )}
                          />
                        </div>
                        {errors.rank && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.rank.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Percentile Field */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium min-w-6 min-h-6 rounded-full flex items-center justify-center  text-white bg-blue-900">
                          2
                        </span>
                        <label className="text-sm font-medium text-black">
                          Update your Percentile
                        </label>
                      </div>
                      <div className="w-1/3">
                        <div
                          className={`transition-transform duration-300 ${
                            errors.percentile
                              ? "-translate-x-4 -translate-y-2 border-red-500"
                              : ""
                          }`}
                        >
                          <Controller
                            name="percentile"
                            control={control}
                            render={({ field }) => (
                              <input
                                type="number"
                                {...field}
                                className={`w-full p-2 border ${
                                  errors.percentile
                                    ? "border-red-500"
                                    : "border-gray-300"
                                } rounded-md`}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                            )}
                          />
                        </div>
                        {errors.percentile && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.percentile.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Score Field */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium min-w-6 min-h-6 rounded-full flex items-center justify-center  text-white bg-blue-900">
                          3
                        </span>
                        <label className="text-sm font-medium text-black">
                          Update your current Score (out of 15)
                        </label>
                      </div>
                      <div className="w-1/3">
                        <div
                          className={`transition-transform duration-300 ${
                            errors.score
                              ? "-translate-x-4 -translate-y-2 border-red-500"
                              : ""
                          }`}
                        >
                          <Controller
                            name="score"
                            control={control}
                            render={({ field }) => (
                              <input
                                type="number"
                                {...field}
                                className={`w-full p-2 border ${
                                  errors.score
                                    ? "border-red-500"
                                    : "border-gray-300"
                                } rounded-md`}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                            )}
                          />
                        </div>
                        {errors.score && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.score.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end gap-2"></div>

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex items-center gap-1 bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800"
                      >
                        <div>Save</div>
                        <ArrowRight
                          size={24}
                          strokeWidth={1.25}
                          className="mt-0.5 p-1"
                        />
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default SkillTestDashboard;
