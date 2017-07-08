(function (window) {
	'use strict';

	// Your starting point. Enjoy the ride!
	// 功能一：渲染数据列表
	var app = angular.module('todoApp', []);
	app.controller('todoController', ['$scope', '$location', function ($scope, $location) {
		$scope.todolist = [
			{ id: 1, name: '偷影子的人', looked: true },
			{ id: 2, name: '牧羊人的奇幻之旅', looked: true },
			{ id: 3, name: '萌芽', looked: false },
			{ id: 4, name: '时间简史', looked: true },
			{ id: 5, name: '乡土中国', looked: false },
			{ id: 6, name: '大清相国', looked: true },
			{ id: 7, name: '夏至未至', looked: false },
		]



		//功能二：enter 键 添加数据
		$scope.newTodo = ''
		$scope.add = function () {
			if (!$scope.newTodo) {
				return
			}
			$scope.todolist.push({
				id: $scope.todolist.length + 1,
				name: $scope.newTodo,
				looked: false
			})
			$scope.newTodo = ''
		}
		//功能三：删除数据
		$scope.remove = function (id) {
			for (var i = 0; i < $scope.todolist.length; i++) {
				if (id == $scope.todolist[i].id) {
					$scope.todolist.splice(i, 1);
				}
			}
		}
		// 功能四：双击修改任务内容
		$scope.isId = -1;
		// 修改值，改变输入框编辑状态
		$scope.write = function (id) {
			$scope.isId = id;
		}
		// 保存修改值
		$scope.save = function () {
			$scope.isId = -1;
		}
		// 功能五：全选和反选，任务状态
		// 批量切换任务状态
		$scope.queryAll = false;
		$scope.toggle = function () {
			for (var i = 0; i < $scope.todolist.length; i++) {
				$scope.todolist[i].looked = $scope.queryAll;
			}
		}

		// 功能六：显示未完成任务数
		$scope.plus = function () {
			var count = 0;
			for (var j = 0; j < $scope.todolist.length; j++) {
				if (!$scope.todolist[j].looked) {
					count++;
				}
			}
			return count;
		}


		// 功能七：清除所有已完成任务
		$scope.clearLooked = function () {
			for (var i = $scope.todolist.length - 1; i >= 0; i--) {
				if ($scope.todolist[i].looked) {
					$scope.todolist.splice(i, 1);
				}
			}
		}
		// 功能八：筛选分类，两种方法
		$scope.type = '';
		// （1）函数方法
		// $scope.category = function (status) {
		// 	if (status == '1') {
		// 		$scope.type = '';
		// 	} else if (status == '2') {
		// 		$scope.type = false;
		// 	} else if (status == '3') {
		// 		$scope.type = true;
		// 	}
		// }
		// （2）$watch 监听锚点方法
		// $location是一个对象 url()是其中的一个属性
		// $watch 监听不到对象的变化，只能监听到对象中具体值的变化
		$scope.loca = $location;
		$scope.$watch('loca.url()', function (now,old) {
			switch (now) {
				case ('/active'):
					$scope.type = false;
					break;
				case ('/completed'):
					$scope.type = true;
					break;
				default:
					$scope.type = ''
			}
		})
	}]);
})(window);
