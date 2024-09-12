-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-09-2024 a las 21:59:46
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `escuela`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos`
--

CREATE TABLE `alumnos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `apellido` varchar(30) NOT NULL,
  `inasistencias` float NOT NULL,
  `dni` int(11) NOT NULL,
  `curso` varchar(6) NOT NULL,
  `año` int(11) NOT NULL,
  `division` int(11) NOT NULL,
  `orientacion` enum('basico','alimentos','programacion','informatica') NOT NULL,
  `cuenta_id` int(11) NOT NULL,
  `curso_id` int(11) NOT NULL,
  `grupo_tal` varchar(1) NOT NULL,
  `inas_tal` int(11) NOT NULL,
  `inas_aula` int(11) NOT NULL,
  `inas_preh` int(11) NOT NULL,
  `inas_fis` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `alumnos`
--

INSERT INTO `alumnos` (`id`, `nombre`, `apellido`, `inasistencias`, `dni`, `curso`, `año`, `division`, `orientacion`, `cuenta_id`, `curso_id`, `grupo_tal`, `inas_tal`, `inas_aula`, `inas_preh`, `inas_fis`) VALUES
(1, 'Elias', 'Segatori', 2.25, 48220979, '5to5ta', 5, 5, '', 1, 28, 'b', 2, 2, 1, 0),
(2, 'Luciano', 'Palacios', 43, 545362, '5to2da', 5, 2, '', 1, 25, 'b', 0, 0, 0, 0),
(3, 'Yoel', 'Quiroga', 23, 47878, '5to5ta', 5, 5, '', 1, 28, 'b', 0, 0, 0, 0),
(4, 'Nicolas', 'Alegria', 1.5, 48203200, '5to5ta', 5, 5, '', 1, 28, 'a', 1, 2, 0, 0),
(5, 'Nehuen', 'Lopez', 1, 55555, '5to2da', 5, 2, '', 1, 25, 'a', 0, 0, 0, 0),
(6, 'Turu', 'Liti', 12, 2555, '2do1ra', 2, 1, '', 1, 7, 'a', 0, 0, 0, 0),
(7, 'Tero', 'Lito', 3, 5435, '2do1ra', 2, 1, '', 1, 7, 'b', 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asistencias`
--

CREATE TABLE `asistencias` (
  `id` int(11) NOT NULL,
  `alumno_id` int(11) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `presencia` tinyint(1) NOT NULL,
  `modulo` enum('taller','edu_fis','5to_mod','aula') NOT NULL,
  `clase_id` int(11) NOT NULL,
  `name_completo` varchar(60) NOT NULL,
  `grupo_tal` enum('a','b','both') DEFAULT NULL,
  `justificada` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `asistencias`
--

INSERT INTO `asistencias` (`id`, `alumno_id`, `fecha`, `presencia`, `modulo`, `clase_id`, `name_completo`, `grupo_tal`, `justificada`) VALUES
(74, 3, '2024-09-02 21:04:55', 1, 'aula', 28, 'Yoel Quiroga', '', 0),
(75, 1, '2024-09-02 21:04:55', 0, 'aula', 28, 'Elias Segatori', '', 0),
(76, 4, '2024-09-02 21:04:55', 1, 'aula', 28, 'Nicolas Alegria', '', 0),
(77, 1, '2024-09-02 21:06:05', 0, 'aula', 29, 'Elias Segatori', '', 0),
(78, 3, '2024-09-02 21:06:05', 1, 'aula', 29, 'Yoel Quiroga', '', 0),
(79, 4, '2024-09-02 21:06:05', 1, 'aula', 29, 'Nicolas Alegria', '', 0),
(80, 3, '2024-09-12 17:10:23', 1, 'aula', 37, 'Yoel Quiroga', '', 0),
(81, 4, '2024-09-12 17:10:23', 0, 'aula', 37, 'Nicolas Alegria', '', 0),
(82, 1, '2024-09-12 17:10:24', 0, 'aula', 37, 'Elias Segatori', '', 0),
(83, 1, '2024-09-12 17:11:38', 0, 'aula', 38, 'Elias Segatori', '', 0),
(84, 4, '2024-09-12 17:11:38', 1, 'aula', 38, 'Nicolas Alegria', '', 0),
(85, 3, '2024-09-12 17:11:38', 0, 'aula', 38, 'Yoel Quiroga', '', 0),
(86, 1, '2024-09-12 17:12:10', 0, 'aula', 39, 'Elias Segatori', '', 0),
(87, 4, '2024-09-12 17:12:11', 0, 'aula', 39, 'Nicolas Alegria', '', 0),
(88, 3, '2024-09-12 17:12:11', 0, 'aula', 39, 'Yoel Quiroga', '', 0),
(89, 3, '2024-09-12 17:12:27', 1, 'aula', 40, 'Yoel Quiroga', '', 0),
(90, 1, '2024-09-12 17:12:27', 0, 'aula', 40, 'Elias Segatori', '', 0),
(91, 1, '2024-09-12 17:28:48', 0, 'aula', 41, 'Elias Segatori', '', 0),
(92, 4, '2024-09-12 17:28:48', 0, 'aula', 41, 'Nicolas Alegria', '', 0),
(93, 3, '2024-09-12 17:28:48', 1, 'aula', 41, 'Yoel Quiroga', '', 0),
(94, 3, '2024-09-12 17:32:08', 1, 'aula', 43, 'Yoel Quiroga', '', 0),
(95, 4, '2024-09-12 17:32:08', 0, 'aula', 43, 'Nicolas Alegria', '', 0),
(96, 1, '2024-09-12 17:32:08', 0, 'aula', 43, 'Elias Segatori', '', 0),
(97, 3, '2024-09-12 17:34:11', 1, '5to_mod', 45, 'Yoel Quiroga', '', 0),
(98, 1, '2024-09-12 17:34:11', 0, '5to_mod', 45, 'Elias Segatori', '', 0),
(99, 4, '2024-09-12 17:34:11', 1, '5to_mod', 45, 'Nicolas Alegria', '', 0),
(100, 1, '2024-09-12 17:37:34', 0, 'taller', 48, 'Elias Segatori', 'both', 0),
(101, 4, '2024-09-12 17:37:34', 1, 'taller', 48, 'Nicolas Alegria', 'both', 0),
(102, 3, '2024-09-12 17:37:34', 1, 'taller', 48, 'Yoel Quiroga', 'both', 0),
(103, 4, '2024-09-12 17:37:58', 0, 'taller', 49, 'Nicolas Alegria', 'a', 0),
(104, 1, '2024-09-12 17:53:27', 0, 'taller', 50, 'Elias Segatori', 'both', 0),
(105, 4, '2024-09-12 17:53:27', 1, 'taller', 50, 'Nicolas Alegria', 'both', 0),
(106, 3, '2024-09-12 17:53:27', 1, 'taller', 50, 'Yoel Quiroga', 'both', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clases`
--

CREATE TABLE `clases` (
  `id` int(11) NOT NULL,
  `materia_class_id` int(11) DEFAULT NULL,
  `submit_datetime` datetime DEFAULT current_timestamp(),
  `curso_id` int(11) NOT NULL,
  `prof_asist` tinyint(1) NOT NULL,
  `hora_enum` enum('tal_1','tal_2','ed_fis','mod_5','aul_1','aul_2') DEFAULT NULL,
  `modulo` enum('taller','edu_fis','5to_mod','aula') NOT NULL,
  `grupo_tal` enum('a','b','both') DEFAULT NULL,
  `asistencias` int(11) NOT NULL,
  `justificada` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clases`
--

INSERT INTO `clases` (`id`, `materia_class_id`, `submit_datetime`, `curso_id`, `prof_asist`, `hora_enum`, `modulo`, `grupo_tal`, `asistencias`, `justificada`) VALUES
(28, NULL, '2024-09-02 21:04:55', 28, 1, NULL, 'aula', '', 2, 0),
(29, NULL, '2024-09-02 21:06:05', 28, 1, NULL, 'aula', '', 2, 0),
(30, NULL, '2024-09-12 16:42:55', 28, 1, NULL, 'aula', '', 2, 0),
(31, NULL, '2024-09-12 16:51:15', 28, 1, NULL, 'aula', '', 2, 0),
(32, NULL, '2024-09-12 16:55:02', 28, 1, NULL, 'aula', '', 2, 0),
(33, NULL, '2024-09-12 17:05:48', 28, 1, NULL, 'aula', '', 1, 0),
(34, NULL, '2024-09-12 17:06:35', 28, 1, NULL, 'aula', '', 1, 0),
(35, NULL, '2024-09-12 17:08:11', 28, 1, NULL, 'aula', '', 1, 0),
(36, NULL, '2024-09-12 17:09:06', 28, 1, NULL, 'aula', '', 1, 0),
(37, NULL, '2024-09-12 17:10:23', 28, 1, NULL, 'aula', '', 1, 0),
(38, NULL, '2024-09-12 17:11:37', 28, 1, NULL, 'aula', '', 1, 0),
(39, NULL, '2024-09-12 17:12:10', 28, 1, NULL, 'aula', '', 0, 0),
(40, NULL, '2024-09-12 17:12:27', 28, 1, NULL, 'aula', '', 1, 0),
(41, NULL, '2024-09-12 17:28:48', 28, 1, NULL, 'aula', '', 1, 0),
(42, NULL, '2024-09-12 17:29:08', 28, 1, NULL, 'taller', '', 2, 0),
(43, NULL, '2024-09-12 17:32:08', 28, 1, NULL, 'aula', '', 1, 0),
(44, NULL, '2024-09-12 17:32:33', 28, 1, NULL, 'taller', '', 2, 0),
(45, NULL, '2024-09-12 17:34:11', 28, 1, NULL, '5to_mod', '', 2, 0),
(46, NULL, '2024-09-12 17:34:25', 28, 1, NULL, 'taller', '', 2, 0),
(47, NULL, '2024-09-12 17:36:02', 28, 1, NULL, 'taller', '', 2, 0),
(48, NULL, '2024-09-12 17:37:34', 28, 1, NULL, 'taller', '', 2, 0),
(49, NULL, '2024-09-12 17:37:57', 28, 1, NULL, 'taller', 'a', 0, 0),
(50, NULL, '2024-09-12 17:53:27', 28, 1, NULL, 'taller', '', 2, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuentas`
--

CREATE TABLE `cuentas` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` int(11) NOT NULL,
  `reg_date` datetime NOT NULL DEFAULT current_timestamp(),
  `telefono` int(20) DEFAULT NULL,
  `imagen` varchar(1000) DEFAULT NULL,
  `rol` enum('adm','def','prof','prec','alum','blog') NOT NULL,
  `title` varchar(50) DEFAULT NULL,
  `used` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cuentas`
--

INSERT INTO `cuentas` (`id`, `username`, `email`, `password`, `reg_date`, `telefono`, `imagen`, `rol`, `title`, `used`) VALUES
(1, 'chicho', 'chicho@gmail.com', 1234, '2024-08-22 18:49:46', NULL, NULL, 'adm', NULL, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos`
--

CREATE TABLE `cursos` (
  `id` int(11) NOT NULL,
  `curso` varchar(6) NOT NULL,
  `año` int(11) NOT NULL,
  `division` int(11) NOT NULL,
  `orientacion` enum('basico','programacion','informatica','alimentos') NOT NULL,
  `alumnos` int(11) NOT NULL,
  `turno` enum('morn','afnoon','night') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cursos`
--

INSERT INTO `cursos` (`id`, `curso`, `año`, `division`, `orientacion`, `alumnos`, `turno`) VALUES
(1, '1ro1ra', 1, 1, 'basico', 0, 'morn'),
(2, '1ro2da', 1, 2, 'basico', 0, 'morn'),
(3, '1ro3ra', 1, 3, 'basico', 0, 'afnoon'),
(4, '1ro4ta', 1, 4, 'basico', 0, 'afnoon'),
(5, '1r5ta', 1, 5, 'basico', 0, 'morn'),
(6, '1ro6ta', 1, 6, 'basico', 0, 'afnoon'),
(7, '2do1ra', 2, 1, 'basico', 0, 'morn'),
(8, '2do2da', 2, 2, 'basico', 0, 'morn'),
(9, '2do3ra', 2, 3, 'basico', 0, 'afnoon'),
(10, '2do4ta', 2, 4, 'basico', 0, 'afnoon'),
(11, '2do5ta', 2, 5, 'basico', 0, 'morn'),
(12, '2do6ta', 2, 6, 'basico', 0, 'afnoon'),
(13, '3ro1ra', 3, 1, 'basico', 0, 'morn'),
(14, '3ro2da', 3, 2, 'basico', 0, 'morn'),
(15, '3ro3ra', 3, 3, 'basico', 0, 'afnoon'),
(16, '3ro4ta', 3, 4, 'basico', 0, 'afnoon'),
(17, '3ro5ta', 3, 5, 'basico', 0, 'morn'),
(18, '3ro6ta', 3, 6, 'basico', 0, 'afnoon'),
(19, '4to1ra', 4, 1, 'alimentos', 0, 'morn'),
(20, '4to2da', 4, 2, 'programacion', 0, 'morn'),
(21, '4to3ra', 4, 3, 'alimentos', 0, 'afnoon'),
(22, '4to4ta', 4, 4, 'informatica', 0, 'afnoon'),
(23, '4to5ta', 4, 5, 'programacion', 0, 'afnoon'),
(24, '5to1ra', 5, 1, 'alimentos', 0, 'morn'),
(25, '5to2da', 5, 2, 'programacion', 0, 'morn'),
(26, '5to3ra', 5, 3, 'informatica', 0, 'afnoon'),
(27, '5to4ta', 5, 4, 'alimentos', 0, 'morn'),
(28, '5to5ta', 5, 5, 'programacion', 0, 'afnoon'),
(29, '6to1ra', 6, 1, 'alimentos', 0, 'night'),
(30, '6to2da', 6, 2, 'programacion', 0, 'night'),
(31, '6to3ra', 6, 3, 'informatica', 0, 'night'),
(32, '6to4ta', 6, 4, 'alimentos', 0, 'night'),
(33, '6to5ta', 6, 5, 'programacion', 0, 'night'),
(34, '7mo1ra', 7, 1, 'alimentos', 0, 'night'),
(35, '7mo2da', 7, 2, 'programacion', 0, 'night'),
(36, '7mo3ra', 7, 3, 'informatica', 0, 'night'),
(37, '7mo4ta', 7, 4, 'alimentos', 0, 'night'),
(38, '7mo5ta', 7, 5, 'programacion', 0, 'night');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `info_mat_alu`
--

CREATE TABLE `info_mat_alu` (
  `id` int(11) NOT NULL,
  `alumno_id` int(11) NOT NULL,
  `materia_id` int(11) NOT NULL,
  `1er_cuatr` tinyint(1) NOT NULL,
  `2do_cuatr` tinyint(1) NOT NULL,
  `febr` tinyint(1) NOT NULL,
  `nota` int(11) NOT NULL,
  `asist` int(11) NOT NULL,
  `asist_porc` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materias`
--

CREATE TABLE `materias` (
  `id` int(11) NOT NULL,
  `materia` int(11) NOT NULL,
  `descripcion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materia_class`
--

CREATE TABLE `materia_class` (
  `id` int(11) NOT NULL,
  `profesor_id` int(11) NOT NULL,
  `materia_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modulo_course`
--

CREATE TABLE `modulo_course` (
  `id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `day` int(11) NOT NULL,
  `modulo` enum('aula','taller','5to_mod','ed_fis') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preceptores`
--

CREATE TABLE `preceptores` (
  `id` int(11) NOT NULL,
  `nombre` varchar(15) NOT NULL,
  `apellido` varchar(15) NOT NULL,
  `dni` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `precep_course`
--

CREATE TABLE `precep_course` (
  `id` int(11) NOT NULL,
  `precept_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesores`
--

CREATE TABLE `profesores` (
  `id` int(11) NOT NULL,
  `nombre` int(11) NOT NULL,
  `apellido` int(11) NOT NULL,
  `tel` int(11) DEFAULT NULL,
  `email` int(11) DEFAULT NULL,
  `dni` int(11) NOT NULL,
  `materia_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `titulos`
--

CREATE TABLE `titulos` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` int(11) NOT NULL,
  `since` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cuenta_id` (`cuenta_id`),
  ADD KEY `curso_id` (`curso_id`);

--
-- Indices de la tabla `asistencias`
--
ALTER TABLE `asistencias`
  ADD PRIMARY KEY (`id`),
  ADD KEY `alumno_id` (`alumno_id`),
  ADD KEY `clase_id` (`clase_id`);

--
-- Indices de la tabla `clases`
--
ALTER TABLE `clases`
  ADD PRIMARY KEY (`id`),
  ADD KEY `materia-class_id` (`materia_class_id`),
  ADD KEY `curso_id` (`curso_id`);

--
-- Indices de la tabla `cuentas`
--
ALTER TABLE `cuentas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cursos`
--
ALTER TABLE `cursos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `info_mat_alu`
--
ALTER TABLE `info_mat_alu`
  ADD PRIMARY KEY (`id`),
  ADD KEY `alumno_id` (`alumno_id`),
  ADD KEY `materia_id` (`materia_id`);

--
-- Indices de la tabla `materias`
--
ALTER TABLE `materias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `materia_class`
--
ALTER TABLE `materia_class`
  ADD PRIMARY KEY (`id`),
  ADD KEY `materia_id` (`materia_id`),
  ADD KEY `profesor_id` (`profesor_id`);

--
-- Indices de la tabla `modulo_course`
--
ALTER TABLE `modulo_course`
  ADD PRIMARY KEY (`id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indices de la tabla `preceptores`
--
ALTER TABLE `preceptores`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `precep_course`
--
ALTER TABLE `precep_course`
  ADD PRIMARY KEY (`id`),
  ADD KEY `precept_id` (`precept_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indices de la tabla `profesores`
--
ALTER TABLE `profesores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `materia_id` (`materia_id`);

--
-- Indices de la tabla `titulos`
--
ALTER TABLE `titulos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `asistencias`
--
ALTER TABLE `asistencias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT de la tabla `clases`
--
ALTER TABLE `clases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de la tabla `cuentas`
--
ALTER TABLE `cuentas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `cursos`
--
ALTER TABLE `cursos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT de la tabla `info_mat_alu`
--
ALTER TABLE `info_mat_alu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `materias`
--
ALTER TABLE `materias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `materia_class`
--
ALTER TABLE `materia_class`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `modulo_course`
--
ALTER TABLE `modulo_course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `preceptores`
--
ALTER TABLE `preceptores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `precep_course`
--
ALTER TABLE `precep_course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `profesores`
--
ALTER TABLE `profesores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `titulos`
--
ALTER TABLE `titulos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD CONSTRAINT `alumnos_ibfk_1` FOREIGN KEY (`cuenta_id`) REFERENCES `cuentas` (`id`),
  ADD CONSTRAINT `alumnos_ibfk_2` FOREIGN KEY (`curso_id`) REFERENCES `cursos` (`id`);

--
-- Filtros para la tabla `asistencias`
--
ALTER TABLE `asistencias`
  ADD CONSTRAINT `asistencias_ibfk_1` FOREIGN KEY (`alumno_id`) REFERENCES `alumnos` (`id`),
  ADD CONSTRAINT `asistencias_ibfk_2` FOREIGN KEY (`clase_id`) REFERENCES `clases` (`id`);

--
-- Filtros para la tabla `clases`
--
ALTER TABLE `clases`
  ADD CONSTRAINT `clases_ibfk_1` FOREIGN KEY (`materia_class_id`) REFERENCES `materia_class` (`id`),
  ADD CONSTRAINT `clases_ibfk_2` FOREIGN KEY (`curso_id`) REFERENCES `cursos` (`id`);

--
-- Filtros para la tabla `info_mat_alu`
--
ALTER TABLE `info_mat_alu`
  ADD CONSTRAINT `info_mat_alu_ibfk_1` FOREIGN KEY (`alumno_id`) REFERENCES `alumnos` (`id`),
  ADD CONSTRAINT `info_mat_alu_ibfk_2` FOREIGN KEY (`materia_id`) REFERENCES `materias` (`id`);

--
-- Filtros para la tabla `materia_class`
--
ALTER TABLE `materia_class`
  ADD CONSTRAINT `materia_class_ibfk_1` FOREIGN KEY (`materia_id`) REFERENCES `materias` (`id`),
  ADD CONSTRAINT `materia_class_ibfk_2` FOREIGN KEY (`profesor_id`) REFERENCES `profesores` (`id`);

--
-- Filtros para la tabla `modulo_course`
--
ALTER TABLE `modulo_course`
  ADD CONSTRAINT `modulo_course_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `cursos` (`id`);

--
-- Filtros para la tabla `precep_course`
--
ALTER TABLE `precep_course`
  ADD CONSTRAINT `precep_course_ibfk_1` FOREIGN KEY (`precept_id`) REFERENCES `preceptores` (`id`),
  ADD CONSTRAINT `precep_course_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `cursos` (`id`);

--
-- Filtros para la tabla `profesores`
--
ALTER TABLE `profesores`
  ADD CONSTRAINT `profesores_ibfk_1` FOREIGN KEY (`materia_id`) REFERENCES `materias` (`id`);

--
-- Filtros para la tabla `titulos`
--
ALTER TABLE `titulos`
  ADD CONSTRAINT `titulos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `cuentas` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
