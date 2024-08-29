-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-08-2024 a las 01:18:53
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
CREATE DATABASE IF NOT EXISTS `escuela` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `escuela`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos`
--

CREATE TABLE `alumnos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `apellido` varchar(30) NOT NULL,
  `inasistencias` int(11) NOT NULL,
  `dni` int(11) NOT NULL,
  `curso` varchar(6) NOT NULL,
  `año` int(11) NOT NULL,
  `division` int(11) NOT NULL,
  `orientacion` enum('basico','alimentos','programacion','informatica') NOT NULL,
  `cuenta_id` int(11) NOT NULL,
  `curso_id` int(11) NOT NULL,
  `grupo_tal` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `alumnos`
--

INSERT INTO `alumnos` (`id`, `nombre`, `apellido`, `inasistencias`, `dni`, `curso`, `año`, `division`, `orientacion`, `cuenta_id`, `curso_id`, `grupo_tal`) VALUES
(1, 'Elias', 'Segatori', 17, 48220979, '5to5ta', 5, 5, '', 1, 28, 'b'),
(2, 'Luciano', 'Palacios', 43, 545362, '5to2da', 5, 2, '', 1, 25, 'b'),
(3, 'Yoel', 'Quiroga', 22, 47878, '5to5ta', 5, 5, '', 1, 28, 'b'),
(4, 'Nicolas', 'Alegria', 2, 48203200, '5to5ta', 5, 5, '', 1, 28, 'a'),
(5, 'Nehuen', 'Lopez', 1, 55555, '5to2da', 5, 2, '', 1, 25, 'a'),
(6, 'Turu', 'Liti', 12, 2555, '2do1ra', 2, 1, '', 1, 7, 'a'),
(7, 'Tero', 'Lito', 3, 5435, '2do1ra', 2, 1, '', 1, 7, 'b');

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuenta`
--

CREATE TABLE `cuenta` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` int(11) NOT NULL,
  `reg_date` datetime NOT NULL DEFAULT current_timestamp(),
  `telefono` int(20) DEFAULT NULL,
  `imagen` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cuenta`
--

INSERT INTO `cuenta` (`id`, `username`, `email`, `password`, `reg_date`, `telefono`, `imagen`) VALUES
(1, 'chicho', 'chicho@gmail.com', 1234, '2024-08-22 18:49:46', NULL, NULL);

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
-- Indices de la tabla `cuenta`
--
ALTER TABLE `cuenta`
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
-- Indices de la tabla `profesores`
--
ALTER TABLE `profesores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `materia_id` (`materia_id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT de la tabla `clases`
--
ALTER TABLE `clases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `cuenta`
--
ALTER TABLE `cuenta`
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
-- AUTO_INCREMENT de la tabla `profesores`
--
ALTER TABLE `profesores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD CONSTRAINT `alumnos_ibfk_1` FOREIGN KEY (`cuenta_id`) REFERENCES `cuenta` (`id`),
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
-- Filtros para la tabla `profesores`
--
ALTER TABLE `profesores`
  ADD CONSTRAINT `profesores_ibfk_1` FOREIGN KEY (`materia_id`) REFERENCES `materias` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
