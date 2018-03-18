<template>
  <section class="new-company">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-8 is-narrow">
          <h1 class="title is-2">Создать компанию</h1>
          <b-field
            :type="errors.has('company_name') ? 'is-danger' : ''"
            :message="errors.has('company_name') ? errors.first('company_name') : ''">
            <b-input
              v-model="company.name"
              placeholder="Название компании"
              size="is-medium"
              v-validate="'required|min:2|max:100'"
              name="company_name"
              rounded>
            </b-input>
          </b-field>
          <b-field
            class="is-marginless"
            :type="errors.has('company_description') ? 'is-danger' : ''"
            :message="errors.has('company_description') ? errors.first('company_description') : ''">
            <b-input
              v-autosize
              class="rounded-textarea"
              v-model="company.info"
              placeholder="Информация о компании"
              type="textarea"
              name="company_description"
              v-validate="'required|min:100|max:10000'"
              minlength="100"
              maxlength="10000">
            </b-input>
          </b-field>
          <br>
          <div class="grouped-fields">
            <div class="columns">
              <div class="column is-8">
                <!--TODO: fetch cities async-->
                <b-field
                  label="Город"
                  :type="errors.has('company_city') ? 'is-danger' : ''"
                  :message="errors.has('company_city') ? errors.first('company_city') : ''">
                  <b-autocomplete
                    v-model="company.city"
                    placeholder="Выберите город"
                    :data="cities"
                    @select="option => selected = option"
                    name="company_city"
                    v-validate="'required|alpha_dash'"
                    rounded>
                  </b-autocomplete>
                </b-field>

                <b-field
                  label="Сайт"
                  :type="errors.has('company_url') ? 'is-danger' : ''"
                  :message="errors.has('company_url') ? errors.first('company_url') : ''"
                  is-grouped>
                  <b-input
                    rounded
                    v-model="company.url"
                    placeholder="Например https://yourawesomecompany.com"
                    name="company_url"
                    v-validate="'url'">
                  </b-input>
                </b-field>

                <b-field label="Фотографии" class="is-marginless">
                  <!--TODO: Separate to own component???-->
                  <div class="company-photos">
                    <b-upload
                      v-model="uploadedPhotos"
                      v-validate="'size:1024'"
                      name="company_photos"
                      multiple
                      drag-drop
                      @input="convertFilesToBase64">
                      <div class="add-photo-button is-vertical-center">
                        <div class="has-text-centered">
                          <b-icon icon="plus"></b-icon>
                          <p class="is-size-7">JPEG или PNG размером меньше 1 MB</p>
                        </div>
                      </div>
                    </b-upload>

                    <div class="is-128x128 company-photo" v-for="(photo, index) in company.photos_attributes">
                      <figure class="image is-128x128 is-vertical-center"
                              style="overflow: hidden; background-color: black">
                        <img :src="photo.image_data_uri">
                      </figure>
                      <button class="delete delete-company-photo" @click="removePhoto(index)"></button>
                    </div>
                  </div>
                </b-field>
                <p v-if="errors.has('company_photos')" class="help is-danger is-marginless">Каждый файл должен быть
                  меньше чем 1 MB</p>
                <!--END-->
              </div>
              <div class="column is-4">
                <b-field
                  label="Логотип">
                  <croppa
                    v-model="croppa"
                    :class="errors.has('company_logo') ? 'danger-logo' : ''"
                    :prevent-white-space="true"
                    :accept="'image/jpeg,image/png,image/jpg'"
                    placeholder=""
                    :show-remove-button="false"
                    :width="280"
                    :height="280"
                    v-validate="'presence'"
                    :data-vv-validate-on="'loading-end|image-remove'"
                    name="company_logo"
                    :quality="1">
                    <img slot="placeholder" src="../../assets/placeholder-image.png" alt="">
                    <button
                      v-if="!$_.isEmpty(croppa) && croppa.hasImage()"
                      @click="croppa.remove(); company.logo_data_uri = {}"
                      class="delete delete-logo-button">
                    </button>
                    <p v-if="!$_.isEmpty(croppa) && !croppa.hasImage()" class="is-size-7"
                       style="position: absolute; top: 200px;left:35px;">Только JPEG или PNG изображения</p>
                  </croppa>
                </b-field>
              </div>
            </div>
            <a class="button is-info is-pulled-right is-rounded" @click="createCompany">Создать компанию</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    data() {
      return {
        company: {
          name: '',
          info: '',
          city: '',
          url: '',
          logo_data_uri: {},
          photos_attributes: []
        },
        croppa: {},
        cities: [],
        uploadedPhotos: [],
        responseErrors: {}
      }
    },
    computed: {
      ...mapGetters(['authHeaders'])
    },
    methods: {
      convertFilesToBase64() {
        let promises = this.uploadedPhotos.map(photo => {
          return this.readFile(photo).then(file => {
            return file;
          });
        });

        Promise.all(promises).then(results => {
          this.company.photos_attributes = results.map(e => {
            return { image_data_uri: e }
          })
        });
      },
      readFile(file) {
        return new Promise((resolve, reject) => {
          let reader = new FileReader();

          reader.onload = () => {
            resolve(reader.result);
          };

          reader.readAsDataURL(file);
        });
      },
      removePhoto(index) {
        this.company.photos_attributes.splice(index, 1);
        this.uploadedPhotos.splice(index, 1);
      },
      createCompany() {
        this.company.logo_data_uri = this.croppa.generateDataUrl();

        this.validateBeforeSubmit().then(emptyErrors => {
          if(emptyErrors) {

            this.$http.post('/companies', this.company, { headers: this.authHeaders })
              .then(response => {
                console.log('company created');
                this.$router.push({ name: 'company.show', params: { id: response.data.data.id } })
              })
              .catch(error => {
                console.log(error.response.data.errors);
              })
          }
        });
      },
      validateBeforeSubmit() {
        return new Promise((resolve, reject) => {
          this.$validator.validateAll().then((result) => {
            if(!result) {
              this.danger();
            }
            resolve(result);
          });
        });
      },
      danger() {
        this.$toast.open({
          duration: 4000,
          message: `Произошла ошибка при создании компании. Пожалуйста, проверьте введенные значения`,
          position: 'is-bottom',
          type: 'is-danger'
        })
      }
    },
    created() {
      this.$validator.extend('presence', {
        getMessage: field => {
          return `Поле ${field} не может быть пустым`;
        },
        validate: value => {
          if(this.$_.isEmpty(value)) {
            return false;
          }
          return value.hasImage();
        }
      });
    }
  }
</script>

<style lang="scss">
  .new-company {
    margin-top: 20px;
  }

  .rounded-textarea {
    textarea {
      -webkit-border-radius: 20px;
      -moz-border-radius: 20px;
      border-radius: 20px;
    }
  }

  .croppa-container {
    position: relative;
    display: inline-flex;
    border: 1px dashed $grey-light;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
    cursor: pointer;
    &:hover {
      border-color: $info;
    }

    canvas {
      border-radius: inherit;
    }
  }

  .company-photos {
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
    margin-left: -5px;
  }

  .company-photo {
    position: relative;
    margin: 5px;
    figure {
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
    }
  }

  .delete-company-photo {
    position: absolute;
    overflow: hidden;
    top: -8px;
    right: -8px;
  }

  .add-photo-button {
    justify-content: center;
    width: 126px;
    height: 126px;
  }

  .upload-draggable {
    padding: 0 !important;
    margin: 5px !important;
  }

  .delete-logo-button {
    position: absolute;
    top: -8px;
    right: -8px;
  }

  .slots {
    display: none;
  }

  .grouped-fields {
    margin-top: -1.5rem;
  }

  .danger-logo {
    border-color: $danger;
    &:hover {
      border-color: $danger;
    }
  }
</style>
