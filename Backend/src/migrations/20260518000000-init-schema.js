'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. rol
    await queryInterface.createTable('rol', {
      id_rol: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nombre: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      descripcion: {
        type: Sequelize.STRING(150),
        allowNull: false
      }
    });

    // 2. alergia
    await queryInterface.createTable('alergia', {
      id_alergia: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nombre: {
        type: Sequelize.STRING(100),
        allowNull: false
      }
    });

    // 3. categoria_publicacion
    await queryInterface.createTable('categoria_publicacion', {
      id_categoria: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nombre: {
        type: Sequelize.STRING(45),
        allowNull: false
      }
    });

    // 4. detalle_razon
    await queryInterface.createTable('detalle_razon', {
      id_detalle_razon: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nombre: {
        type: Sequelize.STRING(150),
        allowNull: false
      }
    });

    // 5. tema_tendencia
    await queryInterface.createTable('tema_tendencia', {
      id_tema: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      tema: {
        type: Sequelize.STRING(450),
        allowNull: false
      },
      miembros: {
        type: Sequelize.STRING(100),
        allowNull: false
      }
    });

    // 6. rol_contribuidor
    await queryInterface.createTable('rol_contribuidor', {
      id_rol_contribuidor: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nombre: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      descripcion: {
        type: Sequelize.STRING(45),
        allowNull: false
      }
    });

    // 7. ejercicio
    await queryInterface.createTable('ejercicio', {
      id_ejercicio: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nombre: {
        type: Sequelize.STRING(250),
        allowNull: false
      },
      nivel: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      musculo: {
        type: Sequelize.STRING(120),
        allowNull: false
      },
      video: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      imagen: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      tiempo: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      repeticiones: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      series: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });

    // 8. usuario
    await queryInterface.createTable('usuario', {
      id_usuario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      correo: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      contrasenia: {
        type: Sequelize.STRING(250),
        allowNull: false
      },
      nombre: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      edad: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      id_rol: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'rol',
          key: 'id_rol'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });

    // 9. perfil
    await queryInterface.createTable('perfil', {
      id_perfil: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      biografia: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      foto_perfil: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      foto_portada: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuario',
          key: 'id_usuario'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });

    // 10. datos_usuario
    await queryInterface.createTable('datos_usuario', {
      id_datos_usuario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      sexo: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      altura: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      peso: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      lugar_entrenamiento: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      peso_meta: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      plazo_semanas: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      deficit_estimado: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      imagen: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuario',
          key: 'id_usuario'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      semanas_progreso: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      feedback_dieta: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      feedback_ejercicio: {
        type: Sequelize.STRING(150),
        allowNull: false
      }
    });

    // 11. perfil_seguidor
    await queryInterface.createTable('perfil_seguidor', {
      id_perfil: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'perfil',
          key: 'id_perfil'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id_seguidor: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'perfil',
          key: 'id_perfil'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });

    // 12. publicacion
    await queryInterface.createTable('publicacion', {
      id_publicacion: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      tiempo: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      titulo: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      texto: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      imagen: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      id_categoria: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'categoria_publicacion',
          key: 'id_categoria'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuario',
          key: 'id_usuario'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });

    // 13. likes
    await queryInterface.createTable('likes', {
      id_like: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuario',
          key: 'id_usuario'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });

    // 14. comentario
    await queryInterface.createTable('comentario', {
      id_comentario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      texto: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuario',
          key: 'id_usuario'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });

    // 15. publicacion_comentario
    await queryInterface.createTable('publicacion_comentario', {
      id_publicacion: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'publicacion',
          key: 'id_publicacion'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id_comentario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'comentario',
          key: 'id_comentario'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });

    // 16. like_publicacion
    await queryInterface.createTable('like_publicacion', {
      id_like: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'likes',
          key: 'id_like'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id_publicacion: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'publicacion',
          key: 'id_publicacion'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });

    // 17. contribuidor
    await queryInterface.createTable('contribuidor', {
      id_contribuidor: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      puntos: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuario',
          key: 'id_usuario'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id_rol_contribuidor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'rol_contribuidor',
          key: 'id_rol_contribuidor'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });

    // 18. razon_reporte
    await queryInterface.createTable('razon_reporte', {
      id_razon: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nombre: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      id_detalle_razon: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'detalle_razon',
          key: 'id_detalle_razon'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });

    // 19. reporte
    await queryInterface.createTable('reporte', {
      id_reporte: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuario',
          key: 'id_usuario'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id_publicacion: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'publicacion',
          key: 'id_publicacion'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id_razon: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'razon_reporte',
          key: 'id_razon'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      descripcion: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      estado: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      fecha_hora: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    // 20. mensaje_contacto
    await queryInterface.createTable('mensaje_contacto', {
      id_mensaje: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nombre: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      telefono: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      correo: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      mensaje: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      pais: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      fecha: {
        type: Sequelize.DATE,
        allowNull: false
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuario',
          key: 'id_usuario'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });

    // 21. datos_usuario_alergia
    await queryInterface.createTable('datos_usuario_alergia', {
      id_datos_usuario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'datos_usuario',
          key: 'id_datos_usuario'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id_alergia: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'alergia',
          key: 'id_alergia'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });

    // 22. rutina
    await queryInterface.createTable('rutina', {
      id_rutina: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      id_datos_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'datos_usuario',
          key: 'id_datos_usuario'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });

    // 23. rutina_ejercicio
    await queryInterface.createTable('rutina_ejercicio', {
      id_rutina: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'rutina',
          key: 'id_rutina'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id_ejercicio: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'ejercicio',
          key: 'id_ejercicio'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      repeticiones: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      sets: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      tiempo_entre_sets: {
        type: Sequelize.STRING(45),
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop in reverse order to respect foreign key constraints
    await queryInterface.dropTable('rutina_ejercicio');
    await queryInterface.dropTable('rutina');
    await queryInterface.dropTable('datos_usuario_alergia');
    await queryInterface.dropTable('mensaje_contacto');
    await queryInterface.dropTable('reporte');
    await queryInterface.dropTable('razon_reporte');
    await queryInterface.dropTable('contribuidor');
    await queryInterface.dropTable('like_publicacion');
    await queryInterface.dropTable('publicacion_comentario');
    await queryInterface.dropTable('comentario');
    await queryInterface.dropTable('likes');
    await queryInterface.dropTable('publicacion');
    await queryInterface.dropTable('perfil_seguidor');
    await queryInterface.dropTable('datos_usuario');
    await queryInterface.dropTable('perfil');
    await queryInterface.dropTable('usuario');
    await queryInterface.dropTable('ejercicio');
    await queryInterface.dropTable('rol_contribuidor');
    await queryInterface.dropTable('tema_tendencia');
    await queryInterface.dropTable('detalle_razon');
    await queryInterface.dropTable('categoria_publicacion');
    await queryInterface.dropTable('alergia');
    await queryInterface.dropTable('rol');
  }
};
