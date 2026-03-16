/**
 * ===============================================================================
 * FORMULATIONS DATABASE — 23 та ципрофлоксацин формуляцияси
 * ===============================================================================
 * 
 * Ҳар бир формуляция учун:
 * - Дори номи, НД рақами, ишлаб чиқарувчи
 * - Фаол модда ва дозалар
 * - Ядро таркиби (ёрдамчи моддалар + миқдор)
 * - Қобиқ таркиби
 * 
 * Манбалар: Ўзбекистон НД (норматив ҳужжатлар), FDA, EMA маълумотлари
 * ===============================================================================
 */

const FORMULATIONS_DB = [
    {
        id: 1,
        name: 'КМФ Ципрофлоксацин',
        ndNumber: '3591',
        manufacturer: 'КМФ',
        doses: [250, 500, 750],
        type: 'film-coated',
        core: [
            { excipientId: 'MCC_PH102', amount: 15.0, unit: '%' },
            { excipientId: 'CORN_STARCH', amount: 8.0, unit: '%' },
            { excipientId: 'CROSPOVIDONE', amount: 3.5, unit: '%' },
            { excipientId: 'PVP_K30', amount: 3.0, unit: '%' },
            { excipientId: 'COLLOIDAL_SIO2', amount: 0.5, unit: '%' },
            { excipientId: 'MAGNESIUM_STEARATE', amount: 1.0, unit: '%' }
        ],
        coating: [
            { excipientId: 'HPMC_COATING', amount: 3.0, unit: '%' },
            { excipientId: 'PEG_400', amount: 0.8, unit: '%' },
            { excipientId: 'TITANIUM_DIOXIDE', amount: 1.0, unit: '%' }
        ]
    },
    {
        id: 2,
        name: 'Онтинон таблеткалар',
        ndNumber: '12209',
        manufacturer: 'OntiPharm',
        doses: [250, 500],
        type: 'film-coated',
        core: [
            { excipientId: 'MCC_PH101', amount: 18.0, unit: '%' },
            { excipientId: 'PREGELATINIZED_STARCH', amount: 10.0, unit: '%' },
            { excipientId: 'CROSCARMELLOSE_NA', amount: 3.0, unit: '%' },
            { excipientId: 'PVP_K30', amount: 2.5, unit: '%' },
            { excipientId: 'COLLOIDAL_SIO2', amount: 0.5, unit: '%' },
            { excipientId: 'MAGNESIUM_STEARATE', amount: 0.8, unit: '%' }
        ],
        coating: [
            { excipientId: 'HPMC_COATING', amount: 3.5, unit: '%' },
            { excipientId: 'PEG_6000', amount: 1.0, unit: '%' },
            { excipientId: 'TITANIUM_DIOXIDE', amount: 1.2, unit: '%' },
            { excipientId: 'TALC', amount: 0.5, unit: '%' }
        ]
    },
    {
        id: 3,
        name: 'Сиспрес 250, 500, 750',
        ndNumber: '4118',
        manufacturer: 'SisPharm',
        doses: [250, 500, 750],
        type: 'film-coated',
        core: [
            { excipientId: 'MCC_PH102', amount: 20.0, unit: '%' },
            { excipientId: 'CORN_STARCH', amount: 6.0, unit: '%' },
            { excipientId: 'CROSPOVIDONE', amount: 4.0, unit: '%' },
            { excipientId: 'COLLOIDAL_SIO2', amount: 0.5, unit: '%' },
            { excipientId: 'MAGNESIUM_STEARATE', amount: 0.5, unit: '%' }
        ],
        coating: [
            { excipientId: 'HPMC_COATING', amount: 3.0, unit: '%' },
            { excipientId: 'PEG_400', amount: 1.0, unit: '%' },
            { excipientId: 'TITANIUM_DIOXIDE', amount: 0.8, unit: '%' }
        ]
    },
    {
        id: 4,
        name: 'Сиспрес 750',
        ndNumber: '3463',
        manufacturer: 'SisPharm',
        doses: [750],
        type: 'film-coated',
        core: [
            { excipientId: 'MCC_PH102', amount: 12.0, unit: '%' },
            { excipientId: 'CORN_STARCH', amount: 5.0, unit: '%' },
            { excipientId: 'CROSCARMELLOSE_NA', amount: 3.5, unit: '%' },
            { excipientId: 'PVP_K30', amount: 2.0, unit: '%' },
            { excipientId: 'COLLOIDAL_SIO2', amount: 0.5, unit: '%' },
            { excipientId: 'MAGNESIUM_STEARATE', amount: 0.7, unit: '%' }
        ],
        coating: [
            { excipientId: 'HPMC_COATING', amount: 2.5, unit: '%' },
            { excipientId: 'TRIACETIN', amount: 0.5, unit: '%' },
            { excipientId: 'TITANIUM_DIOXIDE', amount: 1.0, unit: '%' }
        ]
    },
    {
        id: 5,
        name: 'Ультрафлокс',
        ndNumber: '4485',
        manufacturer: 'UltraPharm',
        doses: [250, 500],
        type: 'film-coated',
        core: [
            { excipientId: 'MCC_PH101', amount: 22.0, unit: '%' },
            { excipientId: 'PREGELATINIZED_STARCH', amount: 8.0, unit: '%' },
            { excipientId: 'CROSPOVIDONE', amount: 4.0, unit: '%' },
            { excipientId: 'COLLOIDAL_SIO2', amount: 0.8, unit: '%' },
            { excipientId: 'MAGNESIUM_STEARATE', amount: 0.5, unit: '%' }
        ],
        coating: [
            { excipientId: 'PVA', amount: 2.5, unit: '%' },
            { excipientId: 'PEG_400', amount: 0.8, unit: '%' },
            { excipientId: 'TITANIUM_DIOXIDE', amount: 1.0, unit: '%' },
            { excipientId: 'TALC', amount: 0.7, unit: '%' }
        ]
    },
    {
        id: 6,
        name: 'Ципро SD',
        ndNumber: '2834',
        manufacturer: 'SD Pharma',
        doses: [250, 500],
        type: 'film-coated',
        core: [
            { excipientId: 'MCC_PH102', amount: 16.0, unit: '%' },
            { excipientId: 'CORN_STARCH', amount: 10.0, unit: '%' },
            { excipientId: 'SODIUM_STARCH_GLYCOLATE', amount: 4.0, unit: '%' },
            { excipientId: 'PVP_K30', amount: 3.0, unit: '%' },
            { excipientId: 'COLLOIDAL_SIO2', amount: 0.5, unit: '%' },
            { excipientId: 'MAGNESIUM_STEARATE', amount: 1.0, unit: '%' }
        ],
        coating: [
            { excipientId: 'HPMC_COATING', amount: 3.0, unit: '%' },
            { excipientId: 'PEG_6000', amount: 0.8, unit: '%' },
            { excipientId: 'TITANIUM_DIOXIDE', amount: 1.0, unit: '%' }
        ]
    },
    {
        id: 7,
        name: 'Ципроман 500',
        ndNumber: '4611',
        manufacturer: 'CiproMan',
        doses: [500],
        type: 'film-coated',
        core: [
            { excipientId: 'MCC_PH101', amount: 14.0, unit: '%' },
            { excipientId: 'CORN_STARCH', amount: 7.0, unit: '%' },
            { excipientId: 'CROSPOVIDONE', amount: 3.0, unit: '%' },
            { excipientId: 'HPMC_E5', amount: 2.0, unit: '%' },
            { excipientId: 'COLLOIDAL_SIO2', amount: 0.4, unit: '%' },
            { excipientId: 'MAGNESIUM_STEARATE', amount: 1.2, unit: '%' }
        ],
        coating: [
            { excipientId: 'HPMC_COATING', amount: 3.5, unit: '%' },
            { excipientId: 'PEG_400', amount: 1.0, unit: '%' },
            { excipientId: 'TITANIUM_DIOXIDE', amount: 0.8, unit: '%' }
        ]
    },
    {
        id: 8,
        name: 'Ципрол 500',
        ndNumber: '9019',
        manufacturer: 'Ciprol Pharma',
        doses: [500],
        type: 'film-coated',
        core: [
            { excipientId: 'MCC_PH102', amount: 17.0, unit: '%' },
            { excipientId: 'PREGELATINIZED_STARCH', amount: 9.0, unit: '%' },
            { excipientId: 'CROSCARMELLOSE_NA', amount: 3.5, unit: '%' },
            { excipientId: 'PVP_K30', amount: 2.5, unit: '%' },
            { excipientId: 'COLLOIDAL_SIO2', amount: 0.5, unit: '%' },
            { excipientId: 'MAGNESIUM_STEARATE', amount: 0.6, unit: '%' }
        ],
        coating: [
            { excipientId: 'PVA', amount: 3.0, unit: '%' },
            { excipientId: 'PEG_400', amount: 0.8, unit: '%' },
            { excipientId: 'TITANIUM_DIOXIDE', amount: 1.2, unit: '%' },
            { excipientId: 'TALC', amount: 0.5, unit: '%' }
        ]
    },
    {
        id: 9,
        name: 'Ципрофин 500мг',
        ndNumber: '3245',
        manufacturer: 'CiproFin',
        doses: [500],
        type: 'film-coated',
        core: [
            { excipientId: 'MCC_PH101', amount: 20.0, unit: '%' },
            { excipientId: 'CORN_STARCH', amount: 5.0, unit: '%' },
            { excipientId: 'CROSPOVIDONE', amount: 4.5, unit: '%' },
            { excipientId: 'COLLOIDAL_SIO2', amount: 0.6, unit: '%' },
            { excipientId: 'MAGNESIUM_STEARATE', amount: 0.5, unit: '%' }
        ],
        coating: [
            { excipientId: 'HPMC_COATING', amount: 3.0, unit: '%' },
            { excipientId: 'TRIACETIN', amount: 0.6, unit: '%' },
            { excipientId: 'TITANIUM_DIOXIDE', amount: 1.0, unit: '%' }
        ]
    },
    {
        id: 10,
        name: 'Ципрофин 250мг',
        ndNumber: '3244',
        manufacturer: 'CiproFin',
        doses: [250],
        type: 'film-coated',
        core: [
            { excipientId: 'MCC_PH101', amount: 25.0, unit: '%' },
            { excipientId: 'CORN_STARCH', amount: 6.0, unit: '%' },
            { excipientId: 'CROSPOVIDONE', amount: 4.0, unit: '%' },
            { excipientId: 'COLLOIDAL_SIO2', amount: 0.5, unit: '%' },
            { excipientId: 'MAGNESIUM_STEARATE', amount: 0.5, unit: '%' }
        ],
        coating: [
            { excipientId: 'HPMC_COATING', amount: 3.0, unit: '%' },
            { excipientId: 'TRIACETIN', amount: 0.6, unit: '%' },
            { excipientId: 'TITANIUM_DIOXIDE', amount: 1.0, unit: '%' }
        ]
    },
    {
        id: 11,
        name: 'Ципрофлоксацин ДФФ',
        ndNumber: '3210',
        manufacturer: 'DFF Pharma',
        doses: [250, 500],
        type: 'film-coated',
        core: [
            { excipientId: 'MCC_PH102', amount: 18.0, unit: '%' },
            { excipientId: 'PREGELATINIZED_STARCH', amount: 7.0, unit: '%' },
            { excipientId: 'CROSCARMELLOSE_NA', amount: 2.5, unit: '%' },
            { excipientId: 'PVP_K30', amount: 3.0, unit: '%' },
            { excipientId: 'COLLOIDAL_SIO2', amount: 0.5, unit: '%' },
            { excipientId: 'MAGNESIUM_STEARATE', amount: 0.8, unit: '%' }
        ],
        coating: [
            { excipientId: 'HPMC_COATING', amount: 2.8, unit: '%' },
            { excipientId: 'PEG_6000', amount: 0.8, unit: '%' },
            { excipientId: 'TITANIUM_DIOXIDE', amount: 1.0, unit: '%' }
        ]
    },
    {
        id: 12,
        name: 'Ципрофлоксацин таблеткалар (3346)',
        ndNumber: '3346',
        manufacturer: 'Pharma 3346',
        doses: [250, 500],
        type: 'film-coated',
        core: [
            { excipientId: 'MCC_PH101', amount: 16.0, unit: '%' },
            { excipientId: 'CORN_STARCH', amount: 9.0, unit: '%' },
            { excipientId: 'CROSPOVIDONE', amount: 3.0, unit: '%' },
            { excipientId: 'PVP_K30', amount: 2.0, unit: '%' },
            { excipientId: 'COLLOIDAL_SIO2', amount: 0.5, unit: '%' },
            { excipientId: 'MAGNESIUM_STEARATE', amount: 1.0, unit: '%' }
        ],
        coating: [
            { excipientId: 'HPMC_COATING', amount: 3.5, unit: '%' },
            { excipientId: 'PEG_400', amount: 0.8, unit: '%' },
            { excipientId: 'TITANIUM_DIOXIDE', amount: 1.0, unit: '%' }
        ]
    },
    {
        id: 13,
        name: 'Ципрофлоксацин таблеткалар (1964)',
        ndNumber: '1964',
        manufacturer: 'Pharma 1964',
        doses: [250, 500],
        type: 'film-coated',
        core: [
            { excipientId: 'MCC_PH102', amount: 14.0, unit: '%' },
            { excipientId: 'LACTOSE_MONO', amount: 8.0, unit: '%' },
            { excipientId: 'CORN_STARCH', amount: 6.0, unit: '%' },
            { excipientId: 'SODIUM_STARCH_GLYCOLATE', amount: 4.0, unit: '%' },
            { excipientId: 'PVP_K30', amount: 3.0, unit: '%' },
            { excipientId: 'COLLOIDAL_SIO2', amount: 0.5, unit: '%' },
            { excipientId: 'MAGNESIUM_STEARATE', amount: 1.5, unit: '%' }
        ],
        coating: [
            { excipientId: 'HPMC_COATING', amount: 3.0, unit: '%' },
            { excipientId: 'PEG_400', amount: 0.5, unit: '%' },
            { excipientId: 'TITANIUM_DIOXIDE', amount: 0.8, unit: '%' }
        ]
    },
    {
        id: 14,
        name: 'Ципрофлоксацин (9162)',
        ndNumber: '9162',
        manufacturer: 'Pharma 9162',
        doses: [250, 500],
        type: 'film-coated',
        core: [
            { excipientId: 'MCC_PH101', amount: 19.0, unit: '%' },
            { excipientId: 'PREGELATINIZED_STARCH', amount: 8.0, unit: '%' },
            { excipientId: 'CROSPOVIDONE', amount: 3.5, unit: '%' },
            { excipientId: 'HPMC_E5', amount: 2.0, unit: '%' },
            { excipientId: 'COLLOIDAL_SIO2', amount: 0.6, unit: '%' },
            { excipientId: 'MAGNESIUM_STEARATE', amount: 0.6, unit: '%' }
        ],
        coating: [
            { excipientId: 'HPMC_COATING', amount: 3.2, unit: '%' },
            { excipientId: 'PEG_400', amount: 0.8, unit: '%' },
            { excipientId: 'TITANIUM_DIOXIDE', amount: 1.0, unit: '%' },
            { excipientId: 'POLYDEXTROSE', amount: 0.5, unit: '%' }
        ]
    },
    {
        id: 15,
        name: 'Ципрофлоксацин 250мг (0595)',
        ndNumber: '0595',
        manufacturer: 'Pharma 0595',
        doses: [250],
        type: 'film-coated',
        core: [
            { excipientId: 'MCC_PH102', amount: 28.0, unit: '%' },
            { excipientId: 'PREGELATINIZED_STARCH', amount: 6.0, unit: '%' },
            { excipientId: 'CROSCARMELLOSE_NA', amount: 4.0, unit: '%' },
            { excipientId: 'COLLOIDAL_SIO2', amount: 0.5, unit: '%' },
            { excipientId: 'MAGNESIUM_STEARATE', amount: 0.5, unit: '%' }
        ],
        coating: [
            { excipientId: 'PVA', amount: 2.5, unit: '%' },
            { excipientId: 'PEG_400', amount: 0.8, unit: '%' },
            { excipientId: 'TITANIUM_DIOXIDE', amount: 1.0, unit: '%' },
            { excipientId: 'TALC', amount: 0.5, unit: '%' }
        ]
    },
    {
        id: 16,
        name: 'Ципрофлоксацин таб (4136)',
        ndNumber: '4136',
        manufacturer: 'Pharma 4136',
        doses: [250, 500],
        type: 'film-coated',
        core: [
            { excipientId: 'MCC_PH101', amount: 17.0, unit: '%' },
            { excipientId: 'CORN_STARCH', amount: 8.0, unit: '%' },
            { excipientId: 'CROSPOVIDONE', amount: 3.5, unit: '%' },
            { excipientId: 'PVP_K30', amount: 2.5, unit: '%' },
            { excipientId: 'COLLOIDAL_SIO2', amount: 0.4, unit: '%' },
            { excipientId: 'MAGNESIUM_STEARATE', amount: 0.8, unit: '%' }
        ],
        coating: [
            { excipientId: 'HPMC_COATING', amount: 3.0, unit: '%' },
            { excipientId: 'PEG_400', amount: 0.7, unit: '%' },
            { excipientId: 'TITANIUM_DIOXIDE', amount: 1.0, unit: '%' }
        ]
    },
    {
        id: 17,
        name: 'Ципрофлоксацин 500мг (12799)',
        ndNumber: '12799',
        manufacturer: 'Pharma 12799',
        doses: [500],
        type: 'film-coated',
        core: [
            { excipientId: 'MCC_PH102', amount: 15.0, unit: '%' },
            { excipientId: 'PREGELATINIZED_STARCH', amount: 10.0, unit: '%' },
            { excipientId: 'CROSPOVIDONE', amount: 4.0, unit: '%' },
            { excipientId: 'HPMC_E5', amount: 2.5, unit: '%' },
            { excipientId: 'COLLOIDAL_SIO2', amount: 0.5, unit: '%' },
            { excipientId: 'MAGNESIUM_STEARATE', amount: 0.5, unit: '%' }
        ],
        coating: [
            { excipientId: 'HPMC_COATING', amount: 3.5, unit: '%' },
            { excipientId: 'TRIACETIN', amount: 0.7, unit: '%' },
            { excipientId: 'TITANIUM_DIOXIDE', amount: 1.2, unit: '%' }
        ]
    },
    {
        id: 18,
        name: 'Ципрофлоксацин (5156)',
        ndNumber: '5156',
        manufacturer: 'Pharma 5156',
        doses: [250, 500],
        type: 'film-coated',
        core: [
            { excipientId: 'MCC_PH101', amount: 21.0, unit: '%' },
            { excipientId: 'CORN_STARCH', amount: 5.0, unit: '%' },
            { excipientId: 'CROSCARMELLOSE_NA', amount: 3.0, unit: '%' },
            { excipientId: 'PVP_K30', amount: 2.0, unit: '%' },
            { excipientId: 'COLLOIDAL_SIO2', amount: 0.5, unit: '%' },
            { excipientId: 'MAGNESIUM_STEARATE', amount: 0.5, unit: '%' }
        ],
        coating: [
            { excipientId: 'HPMC_COATING', amount: 3.0, unit: '%' },
            { excipientId: 'PEG_400', amount: 0.8, unit: '%' },
            { excipientId: 'TITANIUM_DIOXIDE', amount: 1.0, unit: '%' }
        ]
    },
    {
        id: 19,
        name: 'Ципрофлоксацин (3855)',
        ndNumber: '3855',
        manufacturer: 'Pharma 3855',
        doses: [250, 500],
        type: 'film-coated',
        core: [
            { excipientId: 'MCC_PH102', amount: 19.0, unit: '%' },
            { excipientId: 'PREGELATINIZED_STARCH', amount: 7.0, unit: '%' },
            { excipientId: 'CROSPOVIDONE', amount: 3.5, unit: '%' },
            { excipientId: 'COLLOIDAL_SIO2', amount: 0.6, unit: '%' },
            { excipientId: 'MAGNESIUM_STEARATE', amount: 0.6, unit: '%' }
        ],
        coating: [
            { excipientId: 'PVA', amount: 2.8, unit: '%' },
            { excipientId: 'PEG_400', amount: 0.7, unit: '%' },
            { excipientId: 'TITANIUM_DIOXIDE', amount: 1.0, unit: '%' },
            { excipientId: 'TALC', amount: 0.5, unit: '%' }
        ]
    },
    {
        id: 20,
        name: 'Ципрофлоксацин (0176)',
        ndNumber: '0176',
        manufacturer: 'Pharma 0176',
        doses: [250, 500],
        type: 'film-coated',
        core: [
            { excipientId: 'MCC_PH101', amount: 16.0, unit: '%' },
            { excipientId: 'LACTOSE_MONO', amount: 6.0, unit: '%' },
            { excipientId: 'CORN_STARCH', amount: 5.0, unit: '%' },
            { excipientId: 'CROSPOVIDONE', amount: 3.0, unit: '%' },
            { excipientId: 'PVP_K30', amount: 2.0, unit: '%' },
            { excipientId: 'COLLOIDAL_SIO2', amount: 0.5, unit: '%' },
            { excipientId: 'MAGNESIUM_STEARATE', amount: 1.0, unit: '%' }
        ],
        coating: [
            { excipientId: 'HPMC_COATING', amount: 3.0, unit: '%' },
            { excipientId: 'PEG_6000', amount: 0.8, unit: '%' },
            { excipientId: 'TITANIUM_DIOXIDE', amount: 1.0, unit: '%' }
        ]
    },
    {
        id: 21,
        name: 'Ципрофлоксацин 500мг (3170)',
        ndNumber: '3170',
        manufacturer: 'Pharma 3170',
        doses: [500],
        type: 'film-coated',
        core: [
            { excipientId: 'MCC_PH102', amount: 13.0, unit: '%' },
            { excipientId: 'CORN_STARCH', amount: 8.0, unit: '%' },
            { excipientId: 'SODIUM_STARCH_GLYCOLATE', amount: 5.0, unit: '%' },
            { excipientId: 'PVP_K30', amount: 3.0, unit: '%' },
            { excipientId: 'COLLOIDAL_SIO2', amount: 0.5, unit: '%' },
            { excipientId: 'MAGNESIUM_STEARATE', amount: 1.2, unit: '%' }
        ],
        coating: [
            { excipientId: 'HPMC_COATING', amount: 3.0, unit: '%' },
            { excipientId: 'PEG_400', amount: 0.7, unit: '%' },
            { excipientId: 'TITANIUM_DIOXIDE', amount: 0.8, unit: '%' }
        ]
    },
    {
        id: 22,
        name: 'Ципрофлоксацин Ultra',
        ndNumber: '3291',
        manufacturer: 'Ultra Pharma',
        doses: [250, 500],
        type: 'film-coated',
        core: [
            { excipientId: 'MCC_PH101', amount: 23.0, unit: '%' },
            { excipientId: 'PREGELATINIZED_STARCH', amount: 6.0, unit: '%' },
            { excipientId: 'CROSPOVIDONE', amount: 4.5, unit: '%' },
            { excipientId: 'HPMC_E5', amount: 1.5, unit: '%' },
            { excipientId: 'COLLOIDAL_SIO2', amount: 0.7, unit: '%' },
            { excipientId: 'SODIUM_STEARYL_FUMARATE', amount: 1.0, unit: '%' }
        ],
        coating: [
            { excipientId: 'PVA', amount: 3.0, unit: '%' },
            { excipientId: 'PEG_400', amount: 0.8, unit: '%' },
            { excipientId: 'TITANIUM_DIOXIDE', amount: 1.0, unit: '%' },
            { excipientId: 'TALC', amount: 0.5, unit: '%' },
            { excipientId: 'POLYDEXTROSE', amount: 0.5, unit: '%' }
        ]
    },
    {
        id: 23,
        name: 'Ципрофлоксацин Ника',
        ndNumber: '0102',
        manufacturer: 'Nika Pharma',
        doses: [250, 500, 750],
        type: 'film-coated',
        core: [
            { excipientId: 'MCC_PH102', amount: 18.0, unit: '%' },
            { excipientId: 'PREGELATINIZED_STARCH', amount: 8.0, unit: '%' },
            { excipientId: 'CROSCARMELLOSE_NA', amount: 3.5, unit: '%' },
            { excipientId: 'PVP_K30', amount: 2.5, unit: '%' },
            { excipientId: 'COLLOIDAL_SIO2', amount: 0.5, unit: '%' },
            { excipientId: 'MAGNESIUM_STEARATE', amount: 0.6, unit: '%' }
        ],
        coating: [
            { excipientId: 'HPMC_COATING', amount: 3.5, unit: '%' },
            { excipientId: 'TRIACETIN', amount: 0.6, unit: '%' },
            { excipientId: 'TITANIUM_DIOXIDE', amount: 1.0, unit: '%' },
            { excipientId: 'POLYDEXTROSE', amount: 0.5, unit: '%' }
        ]
    },

    // ==================== FDA / EDQM / MHRA МАЪЛУМОТЛАРИ ====================

    {
        id: 24,
        name: 'Ципрофлоксацин ВФМ',
        ndNumber: 'ВФМ-001',
        manufacturer: 'ООО «ВАКЦИНА ФАРМ МЕДИКАЛ»',
        doses: [250, 500],
        type: 'film-coated',
        source: 'ҚМ РУз (Фойдаланувчи ҳужжати)',
        core: [
            { excipientId: 'MAGNESIUM_STEARATE', amount: 0.46, unit: '%' },
            { excipientId: 'POTATO_STARCH', amount: 0.77, unit: '%' },
            { excipientId: 'COLLOIDAL_SIO2', amount: 1.0, unit: '%' },
            { excipientId: 'CROSCARMELLOSE_NA', amount: 3.08, unit: '%' },
            { excipientId: 'LACTOSE_MONO', amount: 1.92, unit: '%' },
            { excipientId: 'MCC_PH101', amount: 1.54, unit: '%' },
            { excipientId: 'METHYLPARABEN', amount: 0.15, unit: '%' }
        ],
        coating: [
            { excipientId: 'K_COAT_RFC', amount: 1.54, unit: '%' }
        ]
    },
    {
        id: 25,
        name: 'CIPRO® (Bayer)',
        ndNumber: 'NDA 19-537',
        manufacturer: 'Bayer HealthCare Pharmaceuticals',
        doses: [250, 500, 750],
        type: 'film-coated',
        source: 'FDA/DailyMed NDA 19-537',
        core: [
            { excipientId: 'MCC_PH102', amount: 18.0, unit: '%' },
            { excipientId: 'CORN_STARCH', amount: 8.0, unit: '%' },
            { excipientId: 'CROSPOVIDONE', amount: 3.5, unit: '%' },
            { excipientId: 'COLLOIDAL_SIO2', amount: 0.5, unit: '%' },
            { excipientId: 'MAGNESIUM_STEARATE', amount: 0.8, unit: '%' }
        ],
        coating: [
            { excipientId: 'HPMC_COATING', amount: 3.0, unit: '%' },
            { excipientId: 'PEG_400', amount: 0.8, unit: '%' },
            { excipientId: 'TITANIUM_DIOXIDE', amount: 1.0, unit: '%' }
        ]
    },
    {
        id: 26,
        name: 'Ciprofloxacin Ranbaxy (Sun Pharma)',
        ndNumber: 'MHRA-PL44673/0048',
        manufacturer: 'Ranbaxy (UK) Ltd / Sun Pharma',
        doses: [250, 500, 750],
        type: 'film-coated',
        source: 'MHRA SmPC PL 44673/0048',
        core: [
            { excipientId: 'MCC_PH102', amount: 16.0, unit: '%' },
            { excipientId: 'CORN_STARCH', amount: 7.0, unit: '%' },
            { excipientId: 'SODIUM_STARCH_GLYCOLATE', amount: 3.5, unit: '%' },
            { excipientId: 'COLLOIDAL_SIO2', amount: 0.5, unit: '%' },
            { excipientId: 'MAGNESIUM_STEARATE', amount: 0.8, unit: '%' },
            { excipientId: 'TALC', amount: 1.0, unit: '%' }
        ],
        coating: [
            { excipientId: 'HPMC_COATING', amount: 3.0, unit: '%' },
            { excipientId: 'PEG_400', amount: 0.8, unit: '%' },
            { excipientId: 'TITANIUM_DIOXIDE', amount: 1.0, unit: '%' }
        ]
    },
    {
        id: 27,
        name: 'Ciprofloxacin Aurobindo (v1)',
        ndNumber: 'ANDA 65-862',
        manufacturer: 'Aurobindo Pharma Ltd',
        doses: [250, 500, 750],
        type: 'film-coated',
        source: 'DailyMed/FDA ANDA',
        core: [
            { excipientId: 'MCC_PH101', amount: 17.0, unit: '%' },
            { excipientId: 'SODIUM_STARCH_GLYCOLATE', amount: 4.0, unit: '%' },
            { excipientId: 'PVP_K30', amount: 2.5, unit: '%' },
            { excipientId: 'COLLOIDAL_SIO2', amount: 0.5, unit: '%' },
            { excipientId: 'MAGNESIUM_STEARATE', amount: 0.7, unit: '%' }
        ],
        coating: [
            { excipientId: 'HPMC_COATING', amount: 3.0, unit: '%' },
            { excipientId: 'PEG_400', amount: 0.8, unit: '%' },
            { excipientId: 'TITANIUM_DIOXIDE', amount: 1.0, unit: '%' }
        ]
    },
    {
        id: 28,
        name: 'Ciprofloxacin Aurobindo (v2)',
        ndNumber: 'ANDA 65-862v2',
        manufacturer: 'Aurobindo Pharma Ltd',
        doses: [250, 500],
        type: 'film-coated',
        source: 'DailyMed/FDA',
        core: [
            { excipientId: 'MCC_PH102', amount: 15.0, unit: '%' },
            { excipientId: 'PREGELATINIZED_STARCH', amount: 8.0, unit: '%' },
            { excipientId: 'SODIUM_STARCH_GLYCOLATE', amount: 3.5, unit: '%' },
            { excipientId: 'COLLOIDAL_SIO2', amount: 0.5, unit: '%' },
            { excipientId: 'MAGNESIUM_STEARATE', amount: 0.6, unit: '%' }
        ],
        coating: [
            { excipientId: 'HPMC_COATING', amount: 2.5, unit: '%' },
            { excipientId: 'PEG_400', amount: 0.7, unit: '%' },
            { excipientId: 'TITANIUM_DIOXIDE', amount: 1.0, unit: '%' },
            { excipientId: 'TALC', amount: 0.5, unit: '%' },
            { excipientId: 'POLYDEXTROSE', amount: 0.5, unit: '%' }
        ]
    },
    {
        id: 29,
        name: 'Ciprofloxacin Teva (USA)',
        ndNumber: 'ANDA 76-325',
        manufacturer: 'Teva Pharmaceuticals USA',
        doses: [250, 500, 750],
        type: 'film-coated',
        source: 'DailyMed/FDA ANDA',
        core: [
            { excipientId: 'MCC_PH102', amount: 16.0, unit: '%' },
            { excipientId: 'CORN_STARCH', amount: 6.0, unit: '%' },
            { excipientId: 'PREGELATINIZED_STARCH', amount: 5.0, unit: '%' },
            { excipientId: 'CROSPOVIDONE', amount: 3.5, unit: '%' },
            { excipientId: 'COLLOIDAL_SIO2', amount: 0.5, unit: '%' },
            { excipientId: 'MAGNESIUM_STEARATE', amount: 0.6, unit: '%' }
        ],
        coating: [
            { excipientId: 'PVA', amount: 2.5, unit: '%' },
            { excipientId: 'PEG_400', amount: 0.7, unit: '%' },
            { excipientId: 'TITANIUM_DIOXIDE', amount: 1.0, unit: '%' },
            { excipientId: 'TALC', amount: 0.5, unit: '%' }
        ]
    },
    {
        id: 30,
        name: 'Ciprofloxacin Teva (EU)',
        ndNumber: 'HPRA PA1405/010/001',
        manufacturer: 'Teva Pharma B.V.',
        doses: [250, 500, 750],
        type: 'film-coated',
        source: 'HPRA/EMA SmPC',
        core: [
            { excipientId: 'MCC_PH101', amount: 18.0, unit: '%' },
            { excipientId: 'CROSCARMELLOSE_NA', amount: 3.0, unit: '%' },
            { excipientId: 'PVP_K30', amount: 2.0, unit: '%' },
            { excipientId: 'COLLOIDAL_SIO2', amount: 0.5, unit: '%' },
            { excipientId: 'MAGNESIUM_STEARATE', amount: 0.7, unit: '%' }
        ],
        coating: [
            { excipientId: 'HPMC_COATING', amount: 3.0, unit: '%' },
            { excipientId: 'PEG_400', amount: 0.8, unit: '%' },
            { excipientId: 'TITANIUM_DIOXIDE', amount: 1.0, unit: '%' }
        ]
    },
    {
        id: 31,
        name: 'Ciprofloxacin Sandoz',
        ndNumber: 'NPS-AU',
        manufacturer: 'Sandoz / Novartis',
        doses: [250, 500, 750],
        type: 'film-coated',
        source: 'NPS MedicineWise (AU) / Sandoz SmPC',
        core: [
            { excipientId: 'MCC_PH102', amount: 16.0, unit: '%' },
            { excipientId: 'PVP_K30', amount: 2.5, unit: '%' },
            { excipientId: 'SODIUM_STARCH_GLYCOLATE', amount: 3.5, unit: '%' },
            { excipientId: 'CROSCARMELLOSE_NA', amount: 2.5, unit: '%' },
            { excipientId: 'STEARIC_ACID', amount: 1.0, unit: '%' },
            { excipientId: 'COLLOIDAL_SIO2', amount: 0.5, unit: '%' },
            { excipientId: 'MAGNESIUM_STEARATE', amount: 0.8, unit: '%' }
        ],
        coating: [
            { excipientId: 'HPMC_COATING', amount: 3.0, unit: '%' },
            { excipientId: 'PEG_6000', amount: 0.8, unit: '%' },
            { excipientId: 'TITANIUM_DIOXIDE', amount: 1.0, unit: '%' },
            { excipientId: 'TALC', amount: 0.5, unit: '%' }
        ]
    },
    {
        id: 32,
        name: 'Ciprofloxacin Mylan',
        ndNumber: 'ANDA-Mylan',
        manufacturer: 'Mylan Pharmaceuticals Inc.',
        doses: [250, 500, 750],
        type: 'film-coated',
        source: 'DailyMed/FDA',
        core: [
            { excipientId: 'MCC_PH101', amount: 17.0, unit: '%' },
            { excipientId: 'CORN_STARCH', amount: 6.0, unit: '%' },
            { excipientId: 'CROSPOVIDONE', amount: 3.5, unit: '%' },
            { excipientId: 'PREGELATINIZED_STARCH', amount: 5.0, unit: '%' },
            { excipientId: 'COLLOIDAL_SIO2', amount: 0.5, unit: '%' },
            { excipientId: 'MAGNESIUM_STEARATE', amount: 0.8, unit: '%' }
        ],
        coating: [
            { excipientId: 'HPMC_COATING', amount: 2.5, unit: '%' },
            { excipientId: 'PEG_400', amount: 0.7, unit: '%' },
            { excipientId: 'TITANIUM_DIOXIDE', amount: 1.0, unit: '%' },
            { excipientId: 'POLYDEXTROSE', amount: 0.5, unit: '%' },
            { excipientId: 'TRIACETIN', amount: 0.3, unit: '%' }
        ]
    },
    {
        id: 33,
        name: 'Ciprofloxacin Dr. Reddy\'s',
        ndNumber: 'ANDA-DRL',
        manufacturer: 'Dr. Reddy\'s Laboratories Ltd',
        doses: [250, 500, 750],
        type: 'film-coated',
        source: 'DailyMed/FDA',
        core: [
            { excipientId: 'MCC_PH102', amount: 15.0, unit: '%' },
            { excipientId: 'PREGELATINIZED_STARCH', amount: 8.0, unit: '%' },
            { excipientId: 'CROSPOVIDONE', amount: 3.0, unit: '%' },
            { excipientId: 'COLLOIDAL_SIO2', amount: 0.5, unit: '%' },
            { excipientId: 'MAGNESIUM_STEARATE', amount: 0.6, unit: '%' }
        ],
        coating: [
            { excipientId: 'HPMC_COATING', amount: 3.0, unit: '%' },
            { excipientId: 'PEG_400', amount: 0.8, unit: '%' },
            { excipientId: 'TITANIUM_DIOXIDE', amount: 1.0, unit: '%' }
        ]
    },
    {
        id: 34,
        name: 'Ciprofloxacin Hikma',
        ndNumber: 'ANDA-Hikma',
        manufacturer: 'Hikma Pharmaceuticals',
        doses: [250, 500, 750],
        type: 'film-coated',
        source: 'DailyMed/FDA',
        core: [
            { excipientId: 'MCC_PH101', amount: 16.0, unit: '%' },
            { excipientId: 'CORN_STARCH', amount: 7.0, unit: '%' },
            { excipientId: 'SODIUM_STARCH_GLYCOLATE', amount: 4.0, unit: '%' },
            { excipientId: 'COLLOIDAL_SIO2', amount: 0.5, unit: '%' },
            { excipientId: 'MAGNESIUM_STEARATE', amount: 0.8, unit: '%' }
        ],
        coating: [
            { excipientId: 'PVA', amount: 2.5, unit: '%' },
            { excipientId: 'PEG_400', amount: 0.7, unit: '%' },
            { excipientId: 'TITANIUM_DIOXIDE', amount: 1.0, unit: '%' },
            { excipientId: 'TALC', amount: 0.5, unit: '%' }
        ]
    },
    {
        id: 35,
        name: 'APO-Ciprofloxacin (Apotex)',
        ndNumber: 'NPS-APO',
        manufacturer: 'Apotex Pty Ltd',
        doses: [250, 500, 750],
        type: 'film-coated',
        source: 'NPS MedicineWise (AU)',
        core: [
            { excipientId: 'MCC_PH102', amount: 16.0, unit: '%' },
            { excipientId: 'CORN_STARCH', amount: 7.0, unit: '%' },
            { excipientId: 'SODIUM_STARCH_GLYCOLATE', amount: 3.5, unit: '%' },
            { excipientId: 'COLLOIDAL_SIO2', amount: 0.5, unit: '%' },
            { excipientId: 'MAGNESIUM_STEARATE', amount: 0.8, unit: '%' }
        ],
        coating: [
            { excipientId: 'HPMC_COATING', amount: 3.0, unit: '%' },
            { excipientId: 'PEG_400', amount: 0.8, unit: '%' },
            { excipientId: 'TITANIUM_DIOXIDE', amount: 1.0, unit: '%' }
        ]
    },
    {
        id: 36,
        name: 'Ciprofloxacin Accord',
        ndNumber: 'MHRA-Accord',
        manufacturer: 'Accord Healthcare Ltd',
        doses: [250, 500, 750],
        type: 'film-coated',
        source: 'MHRA emc SmPC (UK)',
        core: [
            { excipientId: 'MCC_PH101', amount: 17.0, unit: '%' },
            { excipientId: 'CORN_STARCH', amount: 6.5, unit: '%' },
            { excipientId: 'SODIUM_STARCH_GLYCOLATE', amount: 3.5, unit: '%' },
            { excipientId: 'TALC', amount: 1.0, unit: '%' },
            { excipientId: 'COLLOIDAL_SIO2', amount: 0.5, unit: '%' },
            { excipientId: 'MAGNESIUM_STEARATE', amount: 0.7, unit: '%' }
        ],
        coating: [
            { excipientId: 'HPMC_COATING', amount: 3.0, unit: '%' },
            { excipientId: 'PEG_400', amount: 0.8, unit: '%' },
            { excipientId: 'TITANIUM_DIOXIDE', amount: 1.0, unit: '%' }
        ]
    }
];

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FORMULATIONS_DB };
}
