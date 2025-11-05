# RTK Setup for Website - Documentation

## Project Overview

`rtk-setup-forwebsite` is a **reusable Redux Toolkit + TypeScript setup** that can be easily integrated into React/Next.js projects.

**Included slices:**

- `baseApi` (RTK Query + token handling)
- `blogApi`
- `aboutApi`
- `statisticsApi`
- `notificationApi`
- `userTokenSlice`

---

## 1️⃣ Project Structure

```text
rtk-setup-forwebsite/
│
├── package.json
├── README.md
├── tsconfig.json
├── node_modules/
│
├── src/
│   ├── api/
│   │   ├── baseApi.ts
│   │   ├── blogSlice.ts
│   │   ├── aboutSlice.ts
│   │   ├── statisticsSlice.ts
│   │   └── notificationSlice.ts
│   │
│   ├── store/
│   │   └── index.ts
│   │
│   └── slices/
│       └── userTokenSlice.ts
│
└── index.ts


All core logic is inside the src folder. index.ts is the central export file.

2️⃣ Installation
npm install rtk-setup-forwebsite
# or
yarn add rtk-setup-forwebsite


3️⃣ Using the Store

Wrap your app with Redux Provider:

import { Provider } from "react-redux";
import { store } from "rtk-setup-forwebsite";
import App from "./App";

export default function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
4️⃣ Using API Slices
Example: Blog API
import { useGetallBlogsQuery, useCreateBlogMutation } from "rtk-setup-forwebsite";

function BlogComponent() {
  const { data: blogs, isLoading } = useGetallBlogsQuery();
  const [createBlog, { isLoading: creating }] = useCreateBlogMutation();

  return (
    <div>
      {isLoading
        ? "Loading..."
        : blogs?.map((blog) => (
            <div key={blog.id}>
              <h3>{blog.title}</h3>
              <p>{blog.content}</p>
            </div>
          ))}
    </div>
  );
}


Other slices (about, statistics, notification) work in the same way.

5️⃣ Using User Token Slice
import { useDispatch, useSelector } from "react-redux";
import { addUserAccessToken, removeUserAccessToken } from "rtk-setup-forwebsite";
import type { RootState } from "rtk-setup-forwebsite";

const dispatch = useDispatch();
const token = useSelector((state: RootState) => state.userToken.token);

dispatch(addUserAccessToken("myToken123"));
dispatch(removeUserAccessToken());

6️⃣| Slice             | Description                         |
| ----------------- | ----------------------------------- |
| `baseApi`         | RTK Query setup with token handling |
| `blogApi`         | Blog CRUD endpoints                 |
| `aboutApi`        | About CRUD endpoints                |
| `statisticsApi`   | Statistics & analytics endpoints    |
| `notificationApi` | Notifications endpoints             |
| `userTokenSlice`  | User access token state management  |


7️⃣ Export Structure

All exports are centralized in index.ts:

export { store } from "./src/store";
export * from "./src/api/blogSlice";
export * from "./src/api/aboutSlice";
export * from "./src/api/statisticsSlice";
export * from "./src/api/notificationSlice";
export * from "./src/slices/userTokenSlice";
export { api } from "./src/api/baseApi";

8️⃣ Tips for Users

All API slices are fully typed (TypeScript)

Hooks are auto-generated, e.g., useGetallBlogsQuery

Central store & token management included

Can be easily integrated into any React/Next.js project

যেকোনো React/Next.js project এ সহজে integrate করা যাবে
```
