export default {
  state: {
    tasks: {}
  },
  mutations: {
    initTasks(state) {
      state.tasks = {};
    },
    addTask(state, app) {
      let task = Object.assign({}, app);
      task.windowIsShowing = true;
      if (state.tasks[task.appId]) {
        let len = state.tasks[task.appId].length;
        task.taskId = len;
        state.tasks[task.appId].push(task);
      } else {
        task.taskId = 0;
        state.tasks[task.appId] = [task];
      }
      state.tasks = Object.assign({}, state.tasks);
    },
    delTask(state, task) {
      if (state.tasks[task.appId]) {
        let len = state.tasks[task.appId].length;
        for (let i = 0; i < len; i++) {
          if (state.tasks[task.appId][i].taskId === task.taskId) {
            state.tasks[task.appId].splice(i, 1);
            if (state.tasks[task.appId].length === 0) {
              // 防止出现空数组占位
              delete state.tasks[task.appId];
            }
            break;
          }
        }
        state.tasks = Object.assign({}, state.tasks);
      }
    },
    showDeskTop(state) {
      for (let prop in state.tasks) {
        let len = state.tasks[prop].length;
        for (let i = 0; i < len; i++) {
          state.tasks[prop][i].windowIsShowing = false;
          state.tasks[prop][i] = Object.assign({}, state.tasks[prop][i]);
        }
      }
      state.tasks = Object.assign({}, state.tasks);
    },
    showTheWindow(state, { task, status }) {
      if (state.tasks[task.appId]) {
        let len = state.tasks[task.appId].length;
        for (let i = 0; i < len; i++) {
          if (state.tasks[task.appId][i].taskId === task.taskId) {
            state.tasks[task.appId][i].windowIsShowing =
              status === undefined
                ? !state.tasks[task.appId][i].windowIsShowing
                : status;
            state.tasks[task.appId][i] = Object.assign(
              {},
              state.tasks[task.appId][i]
            );
            break;
          }
        }
        state.tasks = Object.assign({}, state.tasks);
      }
    }
  }
};
