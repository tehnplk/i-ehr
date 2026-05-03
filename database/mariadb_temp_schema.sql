/*M!999999\- enable the sandbox mode */ 
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_accident` (
  `hospcode` varchar(9) DEFAULT NULL,
  `pid` varchar(15) DEFAULT NULL,
  `seq` varchar(16) DEFAULT NULL,
  `datetime_serv` varchar(14) DEFAULT NULL,
  `datetime_ae` varchar(14) DEFAULT NULL,
  `aetype` varchar(2) DEFAULT NULL,
  `aeplace` varchar(2) DEFAULT NULL,
  `typein_ae` varchar(1) DEFAULT NULL,
  `traffic` varchar(1) DEFAULT NULL,
  `vehicle` varchar(2) DEFAULT NULL,
  `alcohol` varchar(1) DEFAULT NULL,
  `nacrotic_drug` varchar(1) DEFAULT NULL,
  `belt` varchar(1) DEFAULT NULL,
  `helmet` varchar(1) DEFAULT NULL,
  `airway` varchar(1) DEFAULT NULL,
  `stopbleed` varchar(1) DEFAULT NULL,
  `splint` varchar(1) DEFAULT NULL,
  `fluid` varchar(1) DEFAULT NULL,
  `urgency` varchar(1) DEFAULT NULL,
  `coma_eye` varchar(1) DEFAULT NULL,
  `coma_speak` varchar(1) DEFAULT NULL,
  `coma_movement` varchar(1) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL,
  `cid` varchar(13) DEFAULT NULL,
  KEY `tmp_exp_3093_accident_ix_pid` (`pid`),
  KEY `tmp_exp_3093_accident_ix_cid` (`cid`),
  KEY `tmp_exp_3093_accident_ix_seq` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_address` (
  `hospcode` varchar(9) DEFAULT NULL,
  `pid` varchar(15) DEFAULT NULL,
  `addresstype` varchar(1) DEFAULT NULL,
  `house_id` varchar(11) DEFAULT NULL,
  `housetype` varchar(1) DEFAULT NULL,
  `roomno` varchar(10) DEFAULT NULL,
  `condo` varchar(75) DEFAULT NULL,
  `houseno` varchar(75) DEFAULT NULL,
  `soisub` varchar(200) DEFAULT NULL,
  `soimain` varchar(200) DEFAULT NULL,
  `road` varchar(200) DEFAULT NULL,
  `villaname` varchar(200) DEFAULT NULL,
  `village` varchar(2) DEFAULT NULL,
  `tambon` varchar(2) DEFAULT NULL,
  `ampur` varchar(2) DEFAULT NULL,
  `changwat` varchar(2) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL,
  `cid` varchar(13) DEFAULT NULL,
  KEY `tmp_exp_3093_address_ix_pid` (`pid`),
  KEY `tmp_exp_3093_address_ix_cid` (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_admission` (
  `hospcode` varchar(9) DEFAULT NULL,
  `pid` varchar(15) DEFAULT NULL,
  `seq` varchar(16) DEFAULT NULL,
  `an` varchar(9) DEFAULT NULL,
  `datetime_admit` varchar(14) DEFAULT NULL,
  `wardadmit` varchar(5) DEFAULT NULL,
  `instype` varchar(4) DEFAULT NULL,
  `typein` varchar(1) DEFAULT NULL,
  `referinhosp` varchar(9) DEFAULT NULL,
  `causein` varchar(1) DEFAULT NULL,
  `admitweight` varchar(5) DEFAULT NULL,
  `admitheight` varchar(3) DEFAULT NULL,
  `datetime_disch` varchar(14) DEFAULT NULL,
  `warddisch` varchar(5) DEFAULT NULL,
  `dischstatus` varchar(1) DEFAULT NULL,
  `dischtype` varchar(1) DEFAULT NULL,
  `referouthosp` varchar(9) DEFAULT NULL,
  `causeout` varchar(1) DEFAULT NULL,
  `cost` varchar(11) DEFAULT NULL,
  `price` varchar(11) DEFAULT NULL,
  `payprice` varchar(11) DEFAULT NULL,
  `actualpay` varchar(11) DEFAULT NULL,
  `provider` varchar(15) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL,
  `drg` varchar(5) DEFAULT NULL,
  `rw` varchar(11) DEFAULT NULL,
  `adjrw` varchar(11) DEFAULT NULL,
  `error` varchar(2) DEFAULT NULL,
  `warning` varchar(2) DEFAULT NULL,
  `actlos` varchar(4) DEFAULT NULL,
  `grouper_version` varchar(20) DEFAULT NULL,
  `cid` varchar(15) DEFAULT NULL,
  KEY `tmp_exp_3093_admission_ix_pid` (`pid`),
  KEY `tmp_exp_3093_admission_ix_cid` (`cid`),
  KEY `tmp_exp_3093_admission_ix_seq` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_anc` (
  `hospcode` varchar(9) DEFAULT NULL,
  `pid` varchar(13) DEFAULT NULL,
  `seq` varchar(16) DEFAULT NULL,
  `date_serv` varchar(8) DEFAULT NULL,
  `gravida` varchar(2) DEFAULT NULL,
  `ancno` varchar(1) DEFAULT NULL,
  `ga` varchar(2) DEFAULT NULL,
  `ancresult` varchar(1) DEFAULT NULL,
  `ancplace` varchar(5) DEFAULT NULL,
  `provider` varchar(15) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL,
  `cid` varchar(13) DEFAULT NULL,
  `weight` varchar(10) DEFAULT NULL,
  KEY `tmp_exp_3093_anc_ix_pid` (`pid`),
  KEY `tmp_exp_3093_anc_ix_cid` (`cid`),
  KEY `tmp_exp_3093_anc_ix_seq` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_appointment` (
  `hospcode` varchar(9) DEFAULT NULL,
  `pid` varchar(15) DEFAULT NULL,
  `an` varchar(9) DEFAULT NULL,
  `seq` varchar(16) DEFAULT NULL,
  `date_serv` varchar(8) DEFAULT NULL,
  `clinic` varchar(5) DEFAULT NULL,
  `apdate` varchar(8) DEFAULT NULL,
  `aptype` varchar(3) DEFAULT NULL,
  `apdiag` varchar(6) DEFAULT NULL,
  `provider` varchar(15) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL,
  `cid` varchar(13) DEFAULT NULL,
  KEY `tmp_exp_3093_appointment_ix_pid` (`pid`),
  KEY `tmp_exp_3093_appointment_ix_cid` (`cid`),
  KEY `tmp_exp_3093_appointment_ix_seq` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_card` (
  `hospcode` varchar(9) DEFAULT NULL,
  `pid` varchar(13) DEFAULT NULL,
  `instype_old` varchar(2) DEFAULT NULL,
  `instype_new` varchar(4) DEFAULT NULL,
  `insid` varchar(18) DEFAULT NULL,
  `startdate` varchar(8) DEFAULT NULL,
  `expiredate` varchar(8) DEFAULT NULL,
  `main` varchar(9) DEFAULT NULL,
  `sub` varchar(9) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL,
  `cid` varchar(13) DEFAULT NULL,
  KEY `tmp_exp_3093_card_ix_pid` (`pid`),
  KEY `tmp_exp_3093_card_ix_cid` (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_care_refer` (
  `hospcode` varchar(9) DEFAULT NULL,
  `referid` varchar(10) DEFAULT NULL,
  `referid_province` varchar(10) DEFAULT NULL,
  `caretype` varchar(1) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_charge_ipd` (
  `hospcode` varchar(9) DEFAULT NULL,
  `pid` varchar(15) DEFAULT NULL,
  `an` varchar(9) DEFAULT NULL,
  `datetime_admit` varchar(14) DEFAULT NULL,
  `wardstay` varchar(5) DEFAULT NULL,
  `chargeitem` varchar(2) DEFAULT NULL,
  `chargelist` varchar(6) DEFAULT NULL,
  `quantity` varchar(11) DEFAULT NULL,
  `instype` varchar(4) DEFAULT NULL,
  `cost` varchar(11) DEFAULT NULL,
  `price` varchar(11) DEFAULT NULL,
  `payprice` varchar(11) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL,
  `cid` varchar(15) DEFAULT NULL,
  KEY `tmp_exp_3093_charge_ipd_ix_pid` (`pid`),
  KEY `tmp_exp_3093_charge_ipd_ix_cid` (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_charge_opd` (
  `hospcode` varchar(9) DEFAULT NULL,
  `pid` varchar(15) DEFAULT NULL,
  `seq` varchar(16) DEFAULT NULL,
  `date_serv` varchar(8) DEFAULT NULL,
  `clinic` varchar(5) DEFAULT NULL,
  `chargeitem` varchar(2) DEFAULT NULL,
  `chargelist` varchar(6) DEFAULT NULL,
  `quantity` varchar(11) DEFAULT NULL,
  `instype` varchar(4) DEFAULT NULL,
  `cost` varchar(11) DEFAULT NULL,
  `price` varchar(11) DEFAULT NULL,
  `payprice` varchar(11) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL,
  `cid` varchar(13) DEFAULT NULL,
  KEY `tmp_exp_3093_charge_opd_ix_pid` (`pid`),
  KEY `tmp_exp_3093_charge_opd_ix_cid` (`cid`),
  KEY `tmp_exp_3093_charge_opd_ix_seq` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_chronic` (
  `hospcode` varchar(9) DEFAULT NULL,
  `pid` varchar(15) DEFAULT NULL,
  `date_diag` varchar(8) DEFAULT NULL,
  `chronic` varchar(6) DEFAULT NULL,
  `hosp_dx` varchar(9) DEFAULT NULL,
  `hosp_rx` varchar(9) DEFAULT NULL,
  `date_disch` varchar(8) DEFAULT NULL,
  `typedisch` varchar(2) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL,
  `cid` varchar(13) DEFAULT NULL,
  KEY `tmp_exp_3093_chronic_ix_pid` (`pid`),
  KEY `tmp_exp_3093_chronic_ix_cid` (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_chronicfu` (
  `hospcode` varchar(9) DEFAULT NULL,
  `pid` varchar(13) DEFAULT NULL,
  `seq` varchar(16) DEFAULT NULL,
  `date_serv` varchar(8) DEFAULT NULL,
  `weight` varchar(5) DEFAULT NULL,
  `height` varchar(3) DEFAULT NULL,
  `waist_cm` varchar(3) DEFAULT NULL,
  `sbp` varchar(3) DEFAULT NULL,
  `dbp` varchar(3) DEFAULT NULL,
  `foot` varchar(1) DEFAULT NULL,
  `retina` varchar(1) DEFAULT NULL,
  `provider` varchar(15) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL,
  `chronicfuplace` varchar(5) DEFAULT NULL,
  `cid` varchar(13) DEFAULT NULL,
  KEY `tmp_exp_3093_chronicfu_ix_pid` (`pid`),
  KEY `tmp_exp_3093_chronicfu_ix_cid` (`cid`),
  KEY `tmp_exp_3093_chronicfu_ix_seq` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_clinical_refer` (
  `hospcode` varchar(9) DEFAULT NULL,
  `referid` varchar(10) DEFAULT NULL,
  `referid_province` varchar(10) DEFAULT NULL,
  `datetime_assess` varchar(14) DEFAULT NULL,
  `clinicalcode` varchar(6) DEFAULT NULL,
  `clinicalname` varchar(250) DEFAULT NULL,
  `clinicalvalue` varchar(6) DEFAULT NULL,
  `clinicalresult` varchar(250) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_community_activity` (
  `hospcode` varchar(9) DEFAULT NULL,
  `vid` varchar(8) DEFAULT NULL,
  `date_start` varchar(8) DEFAULT NULL,
  `date_finish` varchar(8) DEFAULT NULL,
  `comactivity` varchar(7) DEFAULT NULL,
  `provider` varchar(15) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_community_service` (
  `hospcode` varchar(9) DEFAULT NULL,
  `pid` varchar(15) DEFAULT NULL,
  `seq` varchar(16) DEFAULT NULL,
  `date_serv` varchar(8) DEFAULT NULL,
  `comservice` varchar(7) DEFAULT NULL,
  `provider` varchar(15) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL,
  `cid` varchar(13) DEFAULT NULL,
  KEY `tmp_exp_3093_community_service_ix_pid` (`pid`),
  KEY `tmp_exp_3093_community_service_ix_cid` (`cid`),
  KEY `tmp_exp_3093_community_service_ix_seq` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_data_correct` (
  `hospcode` varchar(9) DEFAULT NULL,
  `tablename` varchar(30) DEFAULT NULL,
  `data_correct` varchar(250) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_death` (
  `hospcode` varchar(9) DEFAULT NULL,
  `pid` varchar(15) DEFAULT NULL,
  `hospdeath` varchar(9) DEFAULT NULL,
  `an` varchar(9) DEFAULT NULL,
  `seq` varchar(16) DEFAULT NULL,
  `ddeath` varchar(8) DEFAULT NULL,
  `cdeath_a` varchar(6) DEFAULT NULL,
  `cdeath_b` varchar(6) DEFAULT NULL,
  `cdeath_c` varchar(6) DEFAULT NULL,
  `cdeath_d` varchar(6) DEFAULT NULL,
  `odisease` varchar(6) DEFAULT NULL,
  `cdeath` varchar(6) DEFAULT NULL,
  `pregdeath` varchar(1) DEFAULT NULL,
  `pdeath` varchar(1) DEFAULT NULL,
  `provider` varchar(15) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL,
  `cid` varchar(13) DEFAULT NULL,
  KEY `tmp_exp_3093_death_ix_pid` (`pid`),
  KEY `tmp_exp_3093_death_ix_cid` (`cid`),
  KEY `tmp_exp_3093_death_ix_seq` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_dental` (
  `hospcode` varchar(9) DEFAULT NULL,
  `pid` varchar(13) DEFAULT NULL,
  `seq` varchar(16) DEFAULT NULL,
  `date_serv` varchar(8) DEFAULT NULL,
  `denttype` varchar(1) DEFAULT NULL,
  `servplace` varchar(1) DEFAULT NULL,
  `pteeth` varchar(2) DEFAULT NULL,
  `pcaries` varchar(2) DEFAULT NULL,
  `pfilling` varchar(2) DEFAULT NULL,
  `pextract` varchar(2) DEFAULT NULL,
  `dteeth` varchar(2) DEFAULT NULL,
  `dcaries` varchar(2) DEFAULT NULL,
  `dfilling` varchar(2) DEFAULT NULL,
  `dextract` varchar(2) DEFAULT NULL,
  `need_fluoride` varchar(1) DEFAULT NULL,
  `need_scaling` varchar(1) DEFAULT NULL,
  `need_sealant` varchar(2) DEFAULT NULL,
  `need_pfilling` varchar(2) DEFAULT NULL,
  `need_dfilling` varchar(2) DEFAULT NULL,
  `need_pextract` varchar(2) DEFAULT NULL,
  `need_dextract` varchar(2) DEFAULT NULL,
  `nprosthesis` varchar(1) DEFAULT NULL,
  `permanent_permanent` varchar(2) DEFAULT NULL,
  `permanent_prosthesis` varchar(2) DEFAULT NULL,
  `prosthesis_prosthesis` varchar(2) DEFAULT NULL,
  `gum` varchar(6) DEFAULT NULL,
  `schooltype` varchar(1) DEFAULT NULL,
  `class` varchar(1) DEFAULT NULL,
  `provider` varchar(15) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL,
  `cid` varchar(13) DEFAULT NULL,
  KEY `tmp_exp_3093_dental_ix_pid` (`pid`),
  KEY `tmp_exp_3093_dental_ix_cid` (`cid`),
  KEY `tmp_exp_3093_dental_ix_seq` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_diagnosis_ipd` (
  `hospcode` varchar(9) DEFAULT NULL,
  `pid` varchar(15) DEFAULT NULL,
  `an` varchar(9) DEFAULT NULL,
  `datetime_admit` varchar(14) DEFAULT NULL,
  `warddiag` varchar(5) DEFAULT NULL,
  `diagtype` varchar(1) DEFAULT NULL,
  `diagcode` varchar(6) DEFAULT NULL,
  `provider` varchar(15) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL,
  `cid` varchar(13) DEFAULT NULL,
  KEY `tmp_exp_3093_diagnosis_ipd_ix_pid` (`pid`),
  KEY `tmp_exp_3093_diagnosis_ipd_ix_cid` (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_diagnosis_opd` (
  `hospcode` varchar(9) DEFAULT NULL,
  `pid` varchar(13) DEFAULT NULL,
  `seq` varchar(16) DEFAULT NULL,
  `date_serv` varchar(8) DEFAULT NULL,
  `diagtype` varchar(1) DEFAULT NULL,
  `diagcode` varchar(7) DEFAULT NULL,
  `clinic` varchar(5) DEFAULT NULL,
  `provider` varchar(15) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL,
  `cid` varchar(13) DEFAULT NULL,
  KEY `tmp_exp_3093_diagnosis_opd_ix_pid` (`pid`),
  KEY `tmp_exp_3093_diagnosis_opd_ix_cid` (`cid`),
  KEY `tmp_exp_3093_diagnosis_opd_ix_seq` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_disability` (
  `hospcode` varchar(9) DEFAULT NULL,
  `disabid` varchar(13) DEFAULT NULL,
  `pid` varchar(13) DEFAULT NULL,
  `disabtype` varchar(1) DEFAULT NULL,
  `disabcause` varchar(1) DEFAULT NULL,
  `diagcode` varchar(6) DEFAULT NULL,
  `date_detect` varchar(8) DEFAULT NULL,
  `date_disab` varchar(8) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL,
  `cid` varchar(13) DEFAULT NULL,
  KEY `tmp_exp_3093_disability_ix_pid` (`pid`),
  KEY `tmp_exp_3093_disability_ix_cid` (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_drug_ipd` (
  `hospcode` varchar(9) DEFAULT NULL,
  `pid` varchar(15) DEFAULT NULL,
  `an` varchar(9) DEFAULT NULL,
  `datetime_admit` varchar(14) DEFAULT NULL,
  `wardstay` varchar(5) DEFAULT NULL,
  `typedrug` varchar(1) DEFAULT NULL,
  `didstd` varchar(24) DEFAULT NULL,
  `dname` varchar(250) DEFAULT NULL,
  `datestart` varchar(8) DEFAULT NULL,
  `datefinish` varchar(8) DEFAULT NULL,
  `amount` varchar(12) DEFAULT NULL,
  `unit` varchar(3) DEFAULT NULL,
  `unit_packing` varchar(20) DEFAULT NULL,
  `drugprice` varchar(11) DEFAULT NULL,
  `drugcost` varchar(11) DEFAULT NULL,
  `provider` varchar(15) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL,
  `cid` varchar(13) DEFAULT NULL,
  KEY `tmp_exp_3093_drug_ipd_ix_pid` (`pid`),
  KEY `tmp_exp_3093_drug_ipd_ix_cid` (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_drug_opd` (
  `hospcode` varchar(9) DEFAULT NULL,
  `pid` varchar(13) DEFAULT NULL,
  `seq` varchar(16) DEFAULT NULL,
  `date_serv` varchar(8) DEFAULT NULL,
  `clinic` varchar(5) DEFAULT NULL,
  `didstd` varchar(24) DEFAULT NULL,
  `dname` varchar(250) DEFAULT NULL,
  `amount` varchar(15) DEFAULT NULL,
  `unit` varchar(20) DEFAULT NULL,
  `unit_packing` varchar(20) DEFAULT NULL,
  `drugprice` varchar(15) DEFAULT NULL,
  `drugcost` varchar(15) DEFAULT NULL,
  `provider` varchar(15) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL,
  `cid` varchar(13) DEFAULT NULL,
  KEY `tmp_exp_3093_drug_opd_ix_pid` (`pid`),
  KEY `tmp_exp_3093_drug_opd_ix_cid` (`cid`),
  KEY `tmp_exp_3093_drug_opd_ix_seq` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_drug_refer` (
  `hospcode` varchar(9) DEFAULT NULL,
  `referid` varchar(10) DEFAULT NULL,
  `referid_province` varchar(10) DEFAULT NULL,
  `datetime_dstart` varchar(14) DEFAULT NULL,
  `datetime_dfinish` varchar(14) DEFAULT NULL,
  `didstd` varchar(24) DEFAULT NULL,
  `dname` varchar(250) DEFAULT NULL,
  `ddescription` varchar(250) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_drugallergy` (
  `hospcode` varchar(9) DEFAULT NULL,
  `pid` varchar(15) DEFAULT NULL,
  `daterecord` varchar(8) DEFAULT NULL,
  `drugallergy` varchar(24) DEFAULT NULL,
  `dname` varchar(200) DEFAULT NULL,
  `typedx` varchar(1) DEFAULT NULL,
  `alevel` varchar(1) DEFAULT NULL,
  `symptom` varchar(2) DEFAULT NULL,
  `informant` varchar(1) DEFAULT NULL,
  `informhosp` varchar(9) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL,
  `provider` varchar(15) DEFAULT NULL,
  `cid` varchar(13) DEFAULT NULL,
  KEY `tmp_exp_3093_drugallergy_ix_pid` (`pid`),
  KEY `tmp_exp_3093_drugallergy_ix_cid` (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_epi` (
  `hospcode` varchar(9) DEFAULT NULL,
  `pid` varchar(15) DEFAULT NULL,
  `seq` varchar(16) DEFAULT NULL,
  `date_serv` varchar(8) DEFAULT NULL,
  `vaccinetype` varchar(10) DEFAULT NULL,
  `vaccineplace` varchar(9) DEFAULT NULL,
  `provider` varchar(15) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL,
  `cid` varchar(13) DEFAULT NULL,
  KEY `tmp_exp_3093_epi_ix_pid` (`pid`),
  KEY `tmp_exp_3093_epi_ix_cid` (`cid`),
  KEY `tmp_exp_3093_epi_ix_seq` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_fp` (
  `hospcode` varchar(9) DEFAULT NULL,
  `pid` varchar(13) DEFAULT NULL,
  `seq` varchar(16) DEFAULT NULL,
  `date_serv` varchar(8) DEFAULT NULL,
  `fptype` varchar(1) DEFAULT NULL,
  `fpplace` varchar(9) DEFAULT NULL,
  `provider` varchar(15) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL,
  `cid` varchar(13) DEFAULT NULL,
  KEY `tmp_exp_3093_fp_ix_pid` (`pid`),
  KEY `tmp_exp_3093_fp_ix_cid` (`cid`),
  KEY `tmp_exp_3093_fp_ix_seq` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_functional` (
  `hospcode` varchar(9) DEFAULT NULL,
  `pid` varchar(13) DEFAULT NULL,
  `seq` varchar(16) DEFAULT NULL,
  `date_serv` varchar(8) DEFAULT NULL,
  `functional_test` varchar(2) DEFAULT NULL,
  `testresult` varchar(3) DEFAULT NULL,
  `dependent` varchar(1) DEFAULT NULL,
  `provider` varchar(15) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL,
  `cid` varchar(13) DEFAULT NULL,
  KEY `tmp_exp_3093_functional_ix_pid` (`pid`),
  KEY `tmp_exp_3093_functional_ix_cid` (`cid`),
  KEY `tmp_exp_3093_functional_ix_seq` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_home` (
  `hospcode` varchar(9) DEFAULT NULL,
  `hid` varchar(14) DEFAULT NULL,
  `house_id` varchar(11) DEFAULT NULL,
  `housetype` varchar(1) DEFAULT NULL,
  `roomno` varchar(10) DEFAULT NULL,
  `condo` varchar(75) DEFAULT NULL,
  `house` varchar(75) DEFAULT NULL,
  `soisub` varchar(200) DEFAULT NULL,
  `soimain` varchar(200) DEFAULT NULL,
  `road` varchar(200) DEFAULT NULL,
  `villaname` varchar(200) DEFAULT NULL,
  `village` varchar(2) DEFAULT NULL,
  `tambon` varchar(2) DEFAULT NULL,
  `ampur` varchar(2) DEFAULT NULL,
  `changwat` varchar(2) DEFAULT NULL,
  `telephone` varchar(10) DEFAULT NULL,
  `latitude` varchar(10) DEFAULT NULL,
  `longitude` varchar(10) DEFAULT NULL,
  `nfamily` varchar(2) DEFAULT NULL,
  `locatype` varchar(1) DEFAULT NULL,
  `vhvid` varchar(15) DEFAULT NULL,
  `headid` varchar(15) DEFAULT NULL,
  `toilet` varchar(1) DEFAULT NULL,
  `water` varchar(1) DEFAULT NULL,
  `watertype` varchar(1) DEFAULT NULL,
  `garbage` varchar(1) DEFAULT NULL,
  `housing` varchar(1) DEFAULT NULL,
  `durability` varchar(1) DEFAULT NULL,
  `cleanliness` varchar(1) DEFAULT NULL,
  `ventilation` varchar(1) DEFAULT NULL,
  `light` varchar(1) DEFAULT NULL,
  `watertm` varchar(1) DEFAULT NULL,
  `mfood` varchar(1) DEFAULT NULL,
  `bcontrol` varchar(1) DEFAULT NULL,
  `acontrol` varchar(1) DEFAULT NULL,
  `chemical` varchar(1) DEFAULT NULL,
  `outdate` varchar(8) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_icf` (
  `hospcode` varchar(9) DEFAULT NULL,
  `disabid` varchar(13) DEFAULT NULL,
  `pid` varchar(13) DEFAULT NULL,
  `seq` varchar(16) DEFAULT NULL,
  `date_serv` varchar(8) DEFAULT NULL,
  `icf` varchar(6) DEFAULT NULL,
  `qualifier` varchar(1) DEFAULT NULL,
  `provider` varchar(15) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL,
  `cid` varchar(13) DEFAULT NULL,
  KEY `tmp_exp_3093_icf_ix_pid` (`pid`),
  KEY `tmp_exp_3093_icf_ix_cid` (`cid`),
  KEY `tmp_exp_3093_icf_ix_seq` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_investigation_refer` (
  `hospcode` varchar(9) DEFAULT NULL,
  `referid` varchar(10) DEFAULT NULL,
  `referid_province` varchar(10) DEFAULT NULL,
  `datetime_invest` varchar(14) DEFAULT NULL,
  `investcode` varchar(6) DEFAULT NULL,
  `investname` varchar(250) DEFAULT NULL,
  `datetime_report` varchar(14) DEFAULT NULL,
  `investvalue` varchar(6) DEFAULT NULL,
  `investresult` varchar(250) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_labfu` (
  `hospcode` varchar(9) DEFAULT NULL,
  `pid` varchar(13) DEFAULT NULL,
  `seq` varchar(16) DEFAULT NULL,
  `date_serv` varchar(8) DEFAULT NULL,
  `labtest` varchar(7) DEFAULT NULL,
  `labresult` varchar(250) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL,
  `labplace` varchar(9) DEFAULT NULL,
  `cid` varchar(13) DEFAULT NULL,
  `provider` varchar(15) DEFAULT NULL,
  KEY `tmp_exp_3093_labfu_ix_pid` (`pid`),
  KEY `tmp_exp_3093_labfu_ix_cid` (`cid`),
  KEY `tmp_exp_3093_labfu_ix_seq` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_labor` (
  `hospcode` varchar(9) DEFAULT NULL,
  `pid` varchar(13) DEFAULT NULL,
  `gravida` varchar(2) DEFAULT NULL,
  `lmp` varchar(8) DEFAULT NULL,
  `edc` varchar(8) DEFAULT NULL,
  `bdate` varchar(8) DEFAULT NULL,
  `bresult` varchar(6) DEFAULT NULL,
  `bplace` varchar(1) DEFAULT NULL,
  `bhosp` varchar(9) DEFAULT NULL,
  `btype` varchar(1) DEFAULT NULL,
  `bdoctor` varchar(1) DEFAULT NULL,
  `lborn` varchar(1) DEFAULT NULL,
  `sborn` varchar(1) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL,
  `cid` varchar(13) DEFAULT NULL,
  KEY `tmp_exp_3093_labor_ix_pid` (`pid`),
  KEY `tmp_exp_3093_labor_ix_cid` (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_ncdscreen` (
  `hospcode` varchar(9) DEFAULT NULL,
  `pid` varchar(15) DEFAULT NULL,
  `seq` varchar(16) DEFAULT NULL,
  `date_serv` varchar(8) DEFAULT NULL,
  `servplace` varchar(1) DEFAULT NULL,
  `smoke` varchar(1) DEFAULT NULL,
  `alcohol` varchar(1) DEFAULT NULL,
  `dmfamily` varchar(1) DEFAULT NULL,
  `htfamily` varchar(1) DEFAULT NULL,
  `weight` varchar(5) DEFAULT NULL,
  `height` varchar(3) DEFAULT NULL,
  `waist_cm` varchar(3) DEFAULT NULL,
  `sbp_1` varchar(3) DEFAULT NULL,
  `dbp_1` varchar(3) DEFAULT NULL,
  `sbp_2` varchar(3) DEFAULT NULL,
  `dbp_2` varchar(3) DEFAULT NULL,
  `bslevel` varchar(6) DEFAULT NULL,
  `bstest` varchar(1) DEFAULT NULL,
  `screenplace` varchar(9) DEFAULT NULL,
  `provider` varchar(15) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL,
  `cid` varchar(13) DEFAULT NULL,
  KEY `tmp_exp_3093_ncdscreen_ix_pid` (`pid`),
  KEY `tmp_exp_3093_ncdscreen_ix_cid` (`cid`),
  KEY `tmp_exp_3093_ncdscreen_ix_seq` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_newborn` (
  `hospcode` varchar(9) DEFAULT NULL,
  `pid` varchar(15) DEFAULT NULL,
  `mpid` varchar(15) DEFAULT NULL,
  `gravida` varchar(2) DEFAULT NULL,
  `ga` varchar(2) DEFAULT NULL,
  `bdate` varchar(8) DEFAULT NULL,
  `btime` varchar(6) DEFAULT NULL,
  `bplace` varchar(1) DEFAULT NULL,
  `bhosp` varchar(9) DEFAULT NULL,
  `birthno` varchar(1) DEFAULT NULL,
  `btype` varchar(1) DEFAULT NULL,
  `bdoctor` varchar(1) DEFAULT NULL,
  `bweight` varchar(4) DEFAULT NULL,
  `asphyxia` varchar(2) DEFAULT NULL,
  `vitk` varchar(1) DEFAULT NULL,
  `tsh` varchar(1) DEFAULT NULL,
  `tshresult` varchar(5) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL,
  `cid` varchar(13) DEFAULT NULL,
  `length` varchar(5) DEFAULT NULL,
  `headcircum` varchar(5) DEFAULT NULL,
  KEY `tmp_exp_3093_newborn_ix_pid` (`pid`),
  KEY `tmp_exp_3093_newborn_ix_cid` (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_newborncare` (
  `hospcode` varchar(9) DEFAULT NULL,
  `pid` varchar(13) DEFAULT NULL,
  `seq` varchar(16) DEFAULT NULL,
  `bdate` varchar(8) DEFAULT NULL,
  `bcare` varchar(8) DEFAULT NULL,
  `bcplace` varchar(9) DEFAULT NULL,
  `bcareresult` varchar(1) DEFAULT NULL,
  `food` varchar(1) DEFAULT NULL,
  `provider` varchar(15) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL,
  `cid` varchar(13) DEFAULT NULL,
  KEY `tmp_exp_3093_newborncare_ix_pid` (`pid`),
  KEY `tmp_exp_3093_newborncare_ix_cid` (`cid`),
  KEY `tmp_exp_3093_newborncare_ix_seq` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_nutrition` (
  `hospcode` varchar(9) DEFAULT NULL,
  `pid` varchar(15) DEFAULT NULL,
  `seq` varchar(16) DEFAULT NULL,
  `date_serv` varchar(8) DEFAULT NULL,
  `nutritionplace` varchar(5) DEFAULT NULL,
  `weight` varchar(5) DEFAULT NULL,
  `height` varchar(3) DEFAULT NULL,
  `headcircum` varchar(5) DEFAULT NULL,
  `childdevelop` varchar(1) DEFAULT NULL,
  `food` varchar(1) DEFAULT NULL,
  `bottle` varchar(1) DEFAULT NULL,
  `provider` varchar(15) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL,
  `cid` varchar(13) DEFAULT NULL,
  KEY `tmp_exp_3093_nutrition_ix_pid` (`pid`),
  KEY `tmp_exp_3093_nutrition_ix_cid` (`cid`),
  KEY `tmp_exp_3093_nutrition_ix_seq` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_person` (
  `hospcode` varchar(9) DEFAULT NULL,
  `cid` varchar(13) DEFAULT NULL,
  `pid` varchar(13) DEFAULT NULL,
  `hid` varchar(14) DEFAULT NULL,
  `prename` varchar(3) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `lname` varchar(50) DEFAULT NULL,
  `hn` varchar(9) DEFAULT NULL,
  `sex` varchar(1) DEFAULT NULL,
  `birth` varchar(8) DEFAULT NULL,
  `mstatus` varchar(1) DEFAULT NULL,
  `occupation_old` varchar(4) DEFAULT NULL,
  `occupation_new` varchar(4) DEFAULT NULL,
  `race` varchar(3) DEFAULT NULL,
  `nation` varchar(3) DEFAULT NULL,
  `religion` varchar(2) DEFAULT NULL,
  `education` varchar(2) DEFAULT NULL,
  `fstatus` varchar(1) DEFAULT NULL,
  `father` varchar(13) DEFAULT NULL,
  `mother` varchar(13) DEFAULT NULL,
  `couple` varchar(13) DEFAULT NULL,
  `vstatus` varchar(1) DEFAULT NULL,
  `movein` varchar(8) DEFAULT NULL,
  `discharge` varchar(1) DEFAULT NULL,
  `ddischarge` varchar(8) DEFAULT NULL,
  `abogroup` varchar(1) DEFAULT NULL,
  `rhgroup` varchar(2) DEFAULT NULL,
  `labor` varchar(2) DEFAULT NULL,
  `passport` varchar(8) DEFAULT NULL,
  `typearea` varchar(1) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL,
  `telephone` varchar(14) DEFAULT NULL,
  `mobile` varchar(14) DEFAULT NULL,
  UNIQUE KEY `tmp_exp_3093_person_ix_pid` (`pid`),
  KEY `tmp_exp_3093_person_ix_cid` (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_policy` (
  `hospcode` varchar(9) DEFAULT NULL,
  `policy_id` varchar(3) DEFAULT NULL,
  `policy_year` varchar(4) DEFAULT NULL,
  `policy_data` varchar(250) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_postnatal` (
  `hospcode` varchar(9) DEFAULT NULL,
  `pid` varchar(13) DEFAULT NULL,
  `seq` varchar(16) DEFAULT NULL,
  `gravida` varchar(2) DEFAULT NULL,
  `bdate` varchar(8) DEFAULT NULL,
  `ppcare` varchar(8) DEFAULT NULL,
  `ppplace` varchar(9) DEFAULT NULL,
  `ppresult` varchar(1) DEFAULT NULL,
  `provider` varchar(15) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL,
  `cid` varchar(13) DEFAULT NULL,
  KEY `tmp_exp_3093_postnatal_ix_pid` (`pid`),
  KEY `tmp_exp_3093_postnatal_ix_cid` (`cid`),
  KEY `tmp_exp_3093_postnatal_ix_seq` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_prenatal` (
  `hospcode` varchar(9) DEFAULT NULL,
  `pid` varchar(13) DEFAULT NULL,
  `gravida` varchar(2) DEFAULT NULL,
  `lmp` varchar(8) DEFAULT NULL,
  `edc` varchar(8) DEFAULT NULL,
  `vdrl_result` varchar(1) DEFAULT NULL,
  `hb_result` varchar(1) DEFAULT NULL,
  `hiv_result` varchar(1) DEFAULT NULL,
  `date_hct` varchar(8) DEFAULT NULL,
  `hct_result` varchar(2) DEFAULT NULL,
  `thalassemia` varchar(1) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL,
  `provider` varchar(15) DEFAULT NULL,
  `cid` varchar(13) DEFAULT NULL,
  `height` varchar(13) DEFAULT NULL,
  KEY `tmp_exp_3093_prenatal_ix_pid` (`pid`),
  KEY `tmp_exp_3093_prenatal_ix_cid` (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_procedure_ipd` (
  `hospcode` varchar(9) DEFAULT NULL,
  `pid` varchar(15) DEFAULT NULL,
  `an` varchar(9) DEFAULT NULL,
  `datetime_admit` varchar(14) DEFAULT NULL,
  `wardstay` varchar(5) DEFAULT NULL,
  `procedcode` varchar(9) DEFAULT NULL,
  `timestart` varchar(14) DEFAULT NULL,
  `timefinish` varchar(14) DEFAULT NULL,
  `serviceprice` varchar(11) DEFAULT NULL,
  `provider` varchar(15) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL,
  `cid` varchar(13) DEFAULT NULL,
  KEY `tmp_exp_3093_procedure_ipd_ix_pid` (`pid`),
  KEY `tmp_exp_3093_procedure_ipd_ix_cid` (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_procedure_opd` (
  `hospcode` varchar(9) DEFAULT NULL,
  `pid` varchar(13) DEFAULT NULL,
  `seq` varchar(16) DEFAULT NULL,
  `date_serv` varchar(8) DEFAULT NULL,
  `clinic` varchar(5) DEFAULT NULL,
  `procedcode` varchar(9) DEFAULT NULL,
  `serviceprice` varchar(11) DEFAULT NULL,
  `provider` varchar(15) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL,
  `cid` varchar(13) DEFAULT NULL,
  KEY `tmp_exp_3093_procedure_opd_ix_pid` (`pid`),
  KEY `tmp_exp_3093_procedure_opd_ix_cid` (`cid`),
  KEY `tmp_exp_3093_procedure_opd_ix_seq` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_procedure_refer` (
  `hospcode` varchar(9) DEFAULT NULL,
  `referid` varchar(10) DEFAULT NULL,
  `referid_province` varchar(10) DEFAULT NULL,
  `timestart` varchar(14) DEFAULT NULL,
  `timefinish` varchar(14) DEFAULT NULL,
  `procedurename` varchar(250) DEFAULT NULL,
  `procedcode` varchar(7) DEFAULT NULL,
  `pdescription` varchar(250) DEFAULT NULL,
  `procedresult` varchar(250) DEFAULT NULL,
  `provider` varchar(250) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_provider` (
  `hospcode` varchar(9) DEFAULT NULL,
  `provider` varchar(15) DEFAULT NULL,
  `registerno` varchar(15) DEFAULT NULL,
  `council` varchar(2) DEFAULT NULL,
  `cid` varchar(13) DEFAULT NULL,
  `prename` varchar(20) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `lname` varchar(50) DEFAULT NULL,
  `sex` varchar(1) DEFAULT NULL,
  `birth` varchar(8) DEFAULT NULL,
  `providertype` varchar(3) DEFAULT NULL,
  `startdate` varchar(8) DEFAULT NULL,
  `outdate` varchar(8) DEFAULT NULL,
  `movefrom` varchar(9) DEFAULT NULL,
  `moveto` varchar(9) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL,
  KEY `tmp_exp_3093_provider_ix_cid` (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_refer_history` (
  `hospcode` varchar(9) DEFAULT NULL,
  `referid` varchar(10) DEFAULT NULL,
  `referid_province` varchar(10) DEFAULT NULL,
  `pid` varchar(15) DEFAULT NULL,
  `seq` varchar(16) DEFAULT NULL,
  `an` varchar(9) DEFAULT NULL,
  `referid_origin` varchar(10) DEFAULT NULL,
  `hospcode_origin` varchar(9) DEFAULT NULL,
  `datetime_serv` varchar(14) DEFAULT NULL,
  `datetime_admit` varchar(14) DEFAULT NULL,
  `datetime_refer` varchar(14) DEFAULT NULL,
  `clinic_refer` varchar(5) DEFAULT NULL,
  `hosp_destination` varchar(9) DEFAULT NULL,
  `chiefcomp` varchar(250) DEFAULT NULL,
  `physicalexam` varchar(250) DEFAULT NULL,
  `diagfirst` varchar(250) DEFAULT NULL,
  `diaglast` varchar(250) DEFAULT NULL,
  `pstatus` varchar(250) DEFAULT NULL,
  `ptype` varchar(1) DEFAULT NULL,
  `emergency` varchar(1) DEFAULT NULL,
  `ptypedis` varchar(2) DEFAULT NULL,
  `causeout` varchar(1) DEFAULT NULL,
  `request` varchar(250) DEFAULT NULL,
  `provider` varchar(15) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL,
  KEY `tmp_exp_3093_refer_history_ix_pid` (`pid`),
  KEY `tmp_exp_3093_refer_history_ix_seq` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_refer_result` (
  `hospcode` varchar(9) DEFAULT NULL,
  `referid_source` varchar(10) DEFAULT NULL,
  `referid_province` varchar(10) DEFAULT NULL,
  `hosp_source` varchar(9) DEFAULT NULL,
  `refer_result` varchar(1) DEFAULT NULL,
  `datetime_in` varchar(14) DEFAULT NULL,
  `pid_in` varchar(15) DEFAULT NULL,
  `an_in` varchar(9) DEFAULT NULL,
  `reason` varchar(250) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_rehabilitation` (
  `hospcode` varchar(9) DEFAULT NULL,
  `pid` varchar(13) DEFAULT NULL,
  `seq` varchar(16) DEFAULT NULL,
  `an` varchar(9) DEFAULT NULL,
  `date_admit` varchar(14) DEFAULT NULL,
  `date_serv` varchar(8) DEFAULT NULL,
  `date_start` varchar(8) DEFAULT NULL,
  `date_finish` varchar(8) DEFAULT NULL,
  `rehabcode` varchar(7) DEFAULT NULL,
  `at_device` varchar(10) DEFAULT NULL,
  `at_no` varchar(2) DEFAULT NULL,
  `rehabplace` varchar(9) DEFAULT NULL,
  `provider` varchar(15) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL,
  `cid` varchar(13) DEFAULT NULL,
  KEY `tmp_exp_3093_rehabilitation_ix_pid` (`pid`),
  KEY `tmp_exp_3093_rehabilitation_ix_cid` (`cid`),
  KEY `tmp_exp_3093_rehabilitation_ix_seq` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_service` (
  `hospcode` varchar(9) DEFAULT NULL,
  `pid` varchar(15) DEFAULT NULL,
  `hn` varchar(15) DEFAULT NULL,
  `seq` varchar(16) DEFAULT NULL,
  `date_serv` varchar(8) DEFAULT NULL,
  `time_serv` varchar(6) DEFAULT NULL,
  `location` varchar(1) DEFAULT NULL,
  `intime` varchar(1) DEFAULT NULL,
  `instype` varchar(4) DEFAULT NULL,
  `insid` varchar(18) DEFAULT NULL,
  `main` varchar(9) DEFAULT NULL,
  `typein` varchar(1) DEFAULT NULL,
  `referinhosp` varchar(9) DEFAULT NULL,
  `causein` varchar(1) DEFAULT NULL,
  `chiefcomp` varchar(250) DEFAULT NULL,
  `servplace` varchar(1) DEFAULT NULL,
  `btemp` varchar(10) DEFAULT NULL,
  `sbp` varchar(3) DEFAULT NULL,
  `dbp` varchar(3) DEFAULT NULL,
  `pr` varchar(3) DEFAULT NULL,
  `rr` varchar(3) DEFAULT NULL,
  `typeout` varchar(1) DEFAULT NULL,
  `referouthosp` varchar(9) DEFAULT NULL,
  `causeout` varchar(1) DEFAULT NULL,
  `cost` varchar(11) DEFAULT NULL,
  `price` varchar(11) DEFAULT NULL,
  `payprice` varchar(11) DEFAULT NULL,
  `actualpay` varchar(11) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL,
  `hsub` varchar(9) DEFAULT NULL,
  `cid` varchar(13) DEFAULT NULL,
  KEY `tmp_exp_3093_service_ix_pid` (`pid`),
  KEY `tmp_exp_3093_service_ix_cid` (`cid`),
  KEY `tmp_exp_3093_service_ix_seq` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_specialpp` (
  `hospcode` varchar(9) DEFAULT NULL,
  `pid` varchar(13) DEFAULT NULL,
  `seq` varchar(16) DEFAULT NULL,
  `date_serv` varchar(8) DEFAULT NULL,
  `servplace` varchar(1) DEFAULT NULL,
  `ppspecial` varchar(6) DEFAULT NULL,
  `ppsplace` varchar(9) DEFAULT NULL,
  `provider` varchar(15) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL,
  `cid` varchar(13) DEFAULT NULL,
  KEY `tmp_exp_3093_specialpp_ix_pid` (`pid`),
  KEY `tmp_exp_3093_specialpp_ix_cid` (`cid`),
  KEY `tmp_exp_3093_specialpp_ix_seq` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_surveillance` (
  `hospcode` varchar(9) DEFAULT NULL,
  `pid` varchar(13) DEFAULT NULL,
  `seq` varchar(16) DEFAULT NULL,
  `date_serv` varchar(8) DEFAULT NULL,
  `an` varchar(9) DEFAULT NULL,
  `datetime_admit` varchar(14) DEFAULT NULL,
  `syndrome` varchar(4) DEFAULT NULL,
  `diagcode` varchar(5) DEFAULT NULL,
  `code506` varchar(2) DEFAULT NULL,
  `diagcodelast` varchar(6) DEFAULT NULL,
  `code506last` varchar(2) DEFAULT NULL,
  `illdate` varchar(8) DEFAULT NULL,
  `illhouse` varchar(75) DEFAULT NULL,
  `illvillage` varchar(2) DEFAULT NULL,
  `illtambon` varchar(2) DEFAULT NULL,
  `illampur` varchar(2) DEFAULT NULL,
  `illchangwat` varchar(2) DEFAULT NULL,
  `latitude` varchar(10) DEFAULT NULL,
  `longitude` varchar(10) DEFAULT NULL,
  `ptstatus` varchar(1) DEFAULT NULL,
  `date_death` varchar(8) DEFAULT NULL,
  `complication` varchar(3) DEFAULT NULL,
  `organism` varchar(4) DEFAULT NULL,
  `provider` varchar(15) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL,
  `cid` varchar(13) DEFAULT NULL,
  KEY `tmp_exp_3093_surveillance_ix_pid` (`pid`),
  KEY `tmp_exp_3093_surveillance_ix_cid` (`cid`),
  KEY `tmp_exp_3093_surveillance_ix_seq` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_village` (
  `hospcode` varchar(9) DEFAULT NULL,
  `vid` varchar(8) DEFAULT NULL,
  `ntraditional` varchar(4) DEFAULT NULL,
  `nmonk` varchar(4) DEFAULT NULL,
  `nreligionleader` varchar(4) DEFAULT NULL,
  `nbroadcast` varchar(2) DEFAULT NULL,
  `nradio` varchar(2) DEFAULT NULL,
  `npchc` varchar(2) DEFAULT NULL,
  `nclinic` varchar(3) DEFAULT NULL,
  `ndrugstore` varchar(3) DEFAULT NULL,
  `nchildcenter` varchar(3) DEFAULT NULL,
  `npschool` varchar(2) DEFAULT NULL,
  `nsschool` varchar(2) DEFAULT NULL,
  `ntemple` varchar(2) DEFAULT NULL,
  `nreligiousplace` varchar(2) DEFAULT NULL,
  `nmarket` varchar(2) DEFAULT NULL,
  `nshop` varchar(3) DEFAULT NULL,
  `nfoodshop` varchar(3) DEFAULT NULL,
  `nstall` varchar(3) DEFAULT NULL,
  `nraintank` varchar(3) DEFAULT NULL,
  `nchickenfarm` varchar(3) DEFAULT NULL,
  `npigfarm` varchar(3) DEFAULT NULL,
  `wastewater` varchar(1) DEFAULT NULL,
  `garbage` varchar(1) DEFAULT NULL,
  `nfactory` varchar(3) DEFAULT NULL,
  `latitude` varchar(10) DEFAULT NULL,
  `longitude` varchar(10) DEFAULT NULL,
  `outdate` varchar(8) DEFAULT NULL,
  `numactually` varchar(2) DEFAULT NULL,
  `risktype` varchar(3) DEFAULT NULL,
  `numstateless` varchar(3) DEFAULT NULL,
  `nexerciseclub` varchar(3) DEFAULT NULL,
  `nolderlyclub` varchar(3) DEFAULT NULL,
  `ndisableclub` varchar(3) DEFAULT NULL,
  `nnumberoneclub` varchar(3) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_exp_3093_women` (
  `hospcode` varchar(9) DEFAULT NULL,
  `pid` varchar(13) DEFAULT NULL,
  `fptype` varchar(1) DEFAULT NULL,
  `nofpcause` varchar(1) DEFAULT NULL,
  `totalson` varchar(2) DEFAULT NULL,
  `numberson` varchar(2) DEFAULT NULL,
  `abortion` varchar(2) DEFAULT NULL,
  `stillbirth` varchar(2) DEFAULT NULL,
  `d_update` varchar(14) DEFAULT NULL,
  `cid` varchar(13) DEFAULT NULL,
  KEY `tmp_exp_3093_women_ix_pid` (`pid`),
  KEY `tmp_exp_3093_women_ix_cid` (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
