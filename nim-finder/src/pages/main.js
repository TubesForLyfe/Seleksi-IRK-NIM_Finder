import React, { useState } from 'react'
import "./main.css"
import DataMahasiswa from "../datas/data_13_21.json"
import KodeFakultas from "../datas/kode_fakultas.json"
import KodeJurusan from "../datas/kode_jurusan.json"
import ListFakultas from "../datas/list_fakultas.json"
import ListJurusan from "../datas/list_jurusan.json"
import { RegexByNIM, RegexByJurusanFakultasAngkatan, RegexByName, RegexByAll, RegexSearch } from '../component/regex'

const Main = () => {
  const [mahasiswa, setMahasiswa] = useState([]);

  const getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
  }

  const getMahasiswa = (e) => {
    const search = e.target.value;
    let result = [];
    if (search.length >= 3) {
        for (let i = 0; i < DataMahasiswa.length; i++) {
            let subData = false;
            if (RegexByNIM(search)) {
                let j = 1;
                while (!subData && j < DataMahasiswa[i].length) {
                    if (RegexSearch(search, DataMahasiswa[i][j])) {
                        subData = true;
                    } else {
                        j++;
                    }
                }
            } else if (RegexByJurusanFakultasAngkatan(search)) {
                const input = search.split([' ']);
                const jurusanfakultas = input[0];
                const angkatan = input[1];

                let k = 1;
                while (!subData && k < DataMahasiswa[i].length) {
                    if (RegexSearch(angkatan, DataMahasiswa[i][k].substring(3,5))) {
                        if (RegexSearch(jurusanfakultas.toUpperCase(), getKeyByValue(KodeFakultas, DataMahasiswa[i][k].substring(0,3))) ||
                        RegexSearch(jurusanfakultas.toUpperCase(), getKeyByValue(KodeJurusan, DataMahasiswa[i][k].substring(0,3)))) {
                            subData = true;
                        } else {
                            if (ListFakultas[DataMahasiswa[i][k].substring(0,3)] == undefined) {
                                if (RegexSearch(jurusanfakultas.toLowerCase(), ListJurusan[DataMahasiswa[i][k].substring(0,3)].toLowerCase())) {
                                    subData = true;
                                }
                            } else {
                                if (RegexSearch(jurusanfakultas.toLowerCase(), ListFakultas[DataMahasiswa[i][k].substring(0,3)].toLowerCase())) {
                                    subData = true;
                                }
                            }
                        }
                    }
                    k++;
                }
            } else if (RegexByName(search)) {
                if (RegexSearch(search.toLowerCase(), DataMahasiswa[i][0].toLowerCase())) {
                    subData = true;
                }
            } else {
                const multivalue = RegexByAll(search);
                if (multivalue.length != 0) {
                    let value = search.split(" ");
                    let nim, jurusanfakultas, angkatan, nama;
                    let k = 0;
                    for (let j = 0; j < multivalue.length; j++) {
                        if (multivalue[j] == "nim") {
                            nim = value[k];
                            k++;
                        } else if (multivalue[j] == "angkatan") {
                            jurusanfakultas = value[k];
                            angkatan = value[k + 1];
                            k += 2;
                        } else {
                            nama = value[k];
                            k++;
                        }
                    }

                    let data = []
                    for (let j = 0; j < multivalue.length; j++) {
                        if (multivalue[j] == "nim") {
                            k = 1;
                            let flag = false;
                            while (!flag && k < DataMahasiswa[i].length) {
                                if (RegexSearch(nim, DataMahasiswa[i][k])) {
                                    flag = true;
                                    data.push(true);
                                } else {
                                    k++;
                                }
                            }

                            if (!flag) {
                                data.push(false);
                            }
                        } else if (multivalue[j] == "angkatan") {
                            let k = 1;
                            let flag = false;
                            while (!flag && k < DataMahasiswa[i].length) {
                                if (RegexSearch(angkatan, DataMahasiswa[i][k].substring(3,5))) {
                                    if (RegexSearch(jurusanfakultas.toUpperCase(), getKeyByValue(KodeFakultas, DataMahasiswa[i][k].substring(0,3))) ||
                                    RegexSearch(jurusanfakultas.toUpperCase(), getKeyByValue(KodeJurusan, DataMahasiswa[i][k].substring(0,3)))) {
                                        flag = true;
                                        data.push(true);
                                    } else {
                                        if (ListFakultas[DataMahasiswa[i][k].substring(0,3)] == undefined) {
                                            if (RegexSearch(jurusanfakultas.toLowerCase(), ListJurusan[DataMahasiswa[i][k].substring(0,3)].toLowerCase())) {
                                                flag = true;
                                                data.push(true);
                                            }
                                        } else {
                                            if (RegexSearch(jurusanfakultas.toLowerCase(), ListFakultas[DataMahasiswa[i][k].substring(0,3)].toLowerCase())) {
                                                flag = true;
                                                data.push(true);
                                            }
                                        }
                                    }
                                }
                                k++;
                            }

                            if (!flag) {
                                data.push(false);
                            }
                        } else {
                            if (RegexSearch(nama.toLowerCase(), DataMahasiswa[i][0].toLowerCase())) {
                                data.push(true);
                            } else {
                                data.push(false);
                            }
                        }
                    }

                    subData = true;
                    for (let k = 0; k < data.length; k++) {
                        if (!data[k]) {
                            subData = false;
                        }
                    }
                }
            }

            if (subData) {
                if (DataMahasiswa[i].length == 2) {
                    result.push({
                        'nama': DataMahasiswa[i][0],
                        'fakultas' : ListFakultas[DataMahasiswa[i][1].substring(0,3)],
                        'nim': DataMahasiswa[i][1],
                        'tpb': true
                    })
                } else {
                    result.push({
                        'nama': DataMahasiswa[i][0],
                        'jurusan': ListJurusan[DataMahasiswa[i][2].substring(0,3)],
                        'fakultas': ListFakultas[DataMahasiswa[i][1].substring(0,3)],
                        'nim_jurusan': DataMahasiswa[i][2],
                        'nim_tpb': DataMahasiswa[i][1],
                        'tpb': false
                    })
                }
            }
        }
    }
    setMahasiswa(result);
  }

  return (
    <div className='container'>
      <div className='finder'>
        <h2>NIM Finder Application</h2>
        <h4>by TubesForLyfe</h4>
        <div className='input'>
            <div className='margin-top-20'>
                <p>Ketik di sini untuk melakukan pencarian</p>
                <input type="text" className='w50 radius-10 padding-left-5' onChange={((e) => getMahasiswa(e))}/>
            </div>
            {(mahasiswa.length > 0) && <div className='margin-top-20'>
                {mahasiswa.map((val, key) => {
                    return (
                        <div>
                            <hr></hr>
                            {val.tpb && <div>
                                <div className='left'>
                                    <h4 className='margin-left-20'>{val.nama}</h4>
                                    <p className='margin-left-20 grey'><i>{val.fakultas}</i></p> 
                                </div>
                                <div className='right'>
                                    <p className='margin-right-20 grey'>{val.nim}</p>
                                </div>
                            </div>}
                            {val.tpb && <p className='margin-bot-110'></p>}
                            {!val.tpb && <div>
                                <div className='left'>
                                    <h4 className='margin-left-20'>{val.nama}</h4>
                                    <p className='margin-left-20 grey'><i>{val.jurusan}</i></p>
                                    <p className='margin-left-20 grey'><i>{val.fakultas}</i></p>   
                                </div>
                                <div className='right'>
                                    <p className='margin-right-20 grey'>{val.nim_jurusan}</p>
                                    <p className='margin-right-20 grey'>{val.nim_tpb}</p>
                                </div>
                            </div>}
                            {!val.tpb && <p className='margin-bot-145'></p>}
                        </div>
                    )
                })}
            </div>} 
        </div>
      </div>
    </div>
  )
}

export default Main
