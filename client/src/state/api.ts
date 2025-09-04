import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Project {
  id: number;
  teamId:number;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

export enum Priority {
  Urgent = "Urgent",
  High = "High",
  Medium = "Medium",
  Low = "Low",
  Backlog = "Backlog",
}

export enum Status {
  ToDo = "To Do",
  WorkInProgress = "Work In Progress",
  UnderReview = "Under Review",
  Completed = "Completed",
}

export interface User {
  userId?: number;
  username: string;
  email: string;
  password:string;
  profilePictureUrl?: string;
  teamId?: number;
  team?: Team;
}

export interface Attachment {
  id: number;
  fileURL: string;
  fileName: string;
  taskId: number;
  uploadedById: number;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  status?: Status;
  priority?: Priority;
  tags?: string;
  startDate?: string;
  dueDate?: string;
  points?: number;
  projectId: number;
  authorUserId?: number;
  assignedUserId?: number;

  author?: User;
  assignee?: User;
  comments?: Comment[];
  attachments?: Attachment[];
}

export interface SearchResults {
  tasks?: Task[];
  projects?: Project[];
  users?: User[];
}

export interface Team {
    teamId: number;
    teamName: string;
    productOwnerUserId?: number;
    projectManagerUserId?: number;
}

export interface SearchResults {
    task?: Task[];
    projects?: Project[];
    users?: User[];
}

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    reducerPath: "api",
    tagTypes: ["Projects", "Tasks", "Users", "Teams","Auth"],
    endpoints: (build) => ({
        getProjects: build.query<Project[], void>({
        query: () => ({
          url:"projects",
          credentials:'include'
        }),
        providesTags: ["Projects"],
        }),
        creatProject: build.mutation<Project, Partial<Project>>({
        query: (project) => ({
            url: "projects",
            method: "POST",
            credentials:"include",
            body: project,
        }),
        invalidatesTags: ["Projects"],
        }),
        getTasks: build.query<Task[], { projectId: number }>({
          query: ({ projectId }) => ({
            url:  `tasks?projectId=${projectId}`,
            credentials:'include'
          }),
          providesTags: (result) =>
              result
              ? result.map(({ id }) => ({ type: "Tasks" as const, id }))
              : [{ type: "Tasks" as const }],
        }),
        getUsersTasks: build.query<Task[],number>({
          query: (userId) => ({
            url:`tasks/user/${userId}`,
            credentials:"include",
          }),
          providesTags: (result,error,userId) =>
              result
              ? result.map(({ id }) => ({ type: "Tasks", id }))
              : [{ type: "Tasks",id:userId}],
        }),
        createTask: build.mutation<Task, Partial<Task>>({
        query: (task) => ({
            url: "tasks",
            method: "POST",
            credentials:"include",
            body: task,
        }),
        invalidatesTags: ["Tasks"],
        }),
        updateTaskStatus: build.mutation<Task, { taskId: number; status: string }>({
        query: ({ taskId, status }) => ({
            url: `tasks/${taskId}/status`,
            method: "PATCH",
            credentials:"include",
            body: { status },
        }),
        invalidatesTags: (result, error, { taskId }) => [
            { type: "Tasks", id: taskId },
        ],
        }),
        search: build.query<SearchResults, string>({
        query: (query) =>({
          url: `search?query=${query}`,
          credentials:"include",
        }),
        }),
        getUsers: build.query<User[], void>({
          query: () => ({
            url:"users",
            credentials:"include",
            }),
          providesTags: ["Users"],
        }),
        createTeam:build.mutation<Team[],Partial<Team>>({
          query : (teamData) => ({
            url:"teams/new",
            credentials:"include",
            body:teamData,
            method:"POST"
          }),
          invalidatesTags:["Teams"]
        }),
        getTeams: build.query<Team[], void>({
          query: () => ({
            url:  "teams",
            credentials:"include",
          }),
          providesTags: ["Teams"],
        }),
        //users apis
        createUser: build.mutation<User[],Partial<User>>({
          query: (signupData) => ({
            url : "users/new",
            credentials:"include",
            method:"POST",
            body:signupData
          }),
          invalidatesTags: ["Auth"]
        }),
        loginUser:build.mutation<User[],Partial<User>>({
          query: (loginData) => ({
            url:"users/login",
            credentials:"include",
            method:"POST",
            body:loginData,
          }),
          invalidatesTags:["Auth"]
        }),
        checkAuth: build.query<User, void>({
          query: () => ({
            url: "users/me",
            credentials: "include",
            method: "GET"
          }),
          providesTags: ["Auth"]
        }),
    }),
});
export const {
    useGetProjectsQuery,
    useCreatProjectMutation,
    useGetTasksQuery,
    useCreateTaskMutation,
    useUpdateTaskStatusMutation,
    useSearchQuery,
    useGetUsersQuery,
    useGetTeamsQuery,
    useGetUsersTasksQuery,
    useCreateUserMutation,
    useLoginUserMutation,
    useCheckAuthQuery,
    useCreateTeamMutation
} = api;